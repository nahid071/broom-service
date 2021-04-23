const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const { isAuthenticated } = require("./../middleware/auth");
const Contractor = require("./../models/ContractorModel");

//
const contractorSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
  jobName: Joi.string().required(),
  photo: Joi.string().required(),
  availableDay: Joi.array().required(),
  availableTime: Joi.array().required(),
  featured: Joi.boolean().required(),
});

//@ Read
router.get(
  "/",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const contractors = await Contractor.find().populate("ratings");
    if (contractors) {
      res.json(contractors);
    } else {
      res.json([]);
    }
  })
);
//@ Add
router.post(
  "/",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const errors = contractorSchema.validate(req.body);
    if (errors.error) {
      throw Error(errors.error.details[0].message);
    }

    const {
      name,
      phone,
      email,
      address,
      jobName,
      desc,
      photo,
      availableDay,
      availableTime,
      featured,
    } = req.body;

    const created = await new Contractor({
      name,
      phone,
      email,
      address,
      jobName,
      desc,
      photo,
      availableDay,
      availableTime,
      featured,
    }).save();

    if (created) {
      res.send("successfuly Created");
    } else {
      throw Error("Not Created");
    }
  })
);
//@ Update
router.put(
  "/",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const errors = contractorSchema.validate(req.body);
    if (errors.error) {
      throw Error(errors.error.details[0].message);
    }
    const {
      id,
      name,
      phone,
      email,
      address,
      jobName,
      desc,
      photo,
      availableDay,
      availableTime,
      featured,
    } = req.body;
    const contracor = await Contractor.findOne({ _id: id });
    if (!contracor) {
      throw Error("Not Found !");
    }
    contracor.name = name;
    contracor.phone = phone;
    contracor.email = email;
    contracor.address = address;
    contracor.jobName = jobName;
    contracor.desc = desc;
    contracor.photo = photo;
    contracor.availableDay = availableDay;
    contracor.availableTime = availableTime;
    contracor.featured = featured;
    const updated = contracor.save();
    if (updated) {
      res.send("successfuly Updated");
    } else {
      throw Error("Not Updated");
    }
  })
);
//@ enable
router.put(
  "/enable/:id",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id || id === "") {
      throw Error("Id Not Found !");
    }
    const contracor = await Contractor.findOne({ _id: id });
    if (!contracor) {
      throw Error("Not Found !");
    }
    contracor.disabled = true;
    const updated = contracor.save();
    if (updated) {
      res.send("successfuly Enabled");
    } else {
      throw Error("Not Enabled");
    }
  })
);
//@ disable
router.put(
  "/disable/:id",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id || id === "") {
      throw Error("Id Not Found !");
    }
    const contracor = await Contractor.findOne({ _id: id });
    if (!contracor) {
      throw Error("Not Found !");
    }
    contracor.disabled = false;
    const updated = contracor.save();
    if (updated) {
      res.send("successfuly Disabled");
    } else {
      throw Error("Not Disabled");
    }
  })
);

module.exports = router;
