const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const { isAuthenticated } = require("./../middleware/auth");
const Rating = require("./../models/RatingModel");
const Contractor = require("./../models/ContractorModel");
// const Order = require("../models/orderModel");

//
const contractorSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
  jobName: Joi.string().required(),
  photo: Joi.string().required(),
  availableTime: Joi.array().required(),
  featured: Joi.boolean().required(),
  desc: Joi.string(),
  rate: Joi.number().required(),
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
      availableTime,
      featured,
      rate,
    } = req.body;

    const created = await new Contractor({
      name,
      phone,
      email,
      address,
      jobName,
      desc,
      photo,
      availableTime,
      featured,
      rate,
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
    const {
      id,
      name,
      phone,
      email,
      address,
      jobName,
      desc,
      photo,
      availableTime,
      featured,
      rate,
    } = req.body;

    if (id === "") {
      throw Error("Contractor not found with This Identification");
    }
    if (name === "") {
      throw Error("Contractor Name must not be empty ");
    }
    if (phone === "") {
      throw Error("Contractor phone must not empty !");
    }
    if (email === "") {
      throw Error("Contractor Email must not empty !");
    }
    if (address === "") {
      throw Error("Contractor Address must not empty !");
    }
    if (jobName === "") {
      throw Error("Contractor jobName must not empty !");
    }

    if (desc === "") {
      throw Error("Contractor Description must not empty !");
    }

    if (photo === "") {
      throw Error("Contractor Photo must not empty !");
    }
    if (rate === "") {
      throw Error("Contractor Rate must not empty !");
    }
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
    contracor.availableTime = availableTime;
    contracor.featured = featured;
    contracor.rate = rate;
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
    const id = req.params.id;
    if (!id || id === "") {
      throw Error("Id Not Found !");
    }
    const contracor = await Contractor.findOne({ _id: id });
    if (!contracor) {
      throw Error("Not Found !");
    }
    contracor.disabled = true;
    const updated = await contracor.save();
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
    const id = req.params.id;
    if (!id || id === "") {
      throw Error("Id Not Found !");
    }
    const contracor = await Contractor.findOne({ _id: id });
    if (!contracor) {
      throw Error("Not Found !");
    }
    contracor.disabled = false;
    const updated = await contracor.save();
    if (updated) {
      res.send("successfuly Disabled");
    } else {
      throw Error("Not Disabled");
    }
  })
);

//@ Read
router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const contractors = await Contractor.find().populate("ratings");
    if (contractors) {
      res.json(contractors);
    } else {
      res.json([]);
    }
  })
);
module.exports = router;
