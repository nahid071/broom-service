const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const { isAuthenticated } = require("./../middleware/auth");
const { About } = require("./../models/UtilModel");
const Message = require("./../models/MessageModel");

router.get("/", (req, res) => {
  res.send("Util");
});
// fetch About
router.get(
  "/about",
  asyncHandler(async (req, res) => {
    const about = await About.findOne();
    if (about) {
      res.json(about);
    } else {
      res.json([]);
    }
  })
);

//@ Add About
router.post(
  "/about",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { title, photo, desc } = req.body;

    if (!title || title === "") throw Error("Title must not be empty !");
    if (!photo || photo === "") throw Error("Image must not be empty !");
    if (!desc || desc === "") throw Error("Description must not be empty !");

    const about = await About.findOne();
    if (about) {
      // Update
      about.title = title;
      about.photo = photo;
      about.desc = desc;
      const updated = await about.save();
      if (updated) {
        res.send("successfuly updated");
      } else {
        throw Error("Not updated");
      }
    } else {
      const created = await new About({
        title,
        photo,
        desc,
      }).save();
      if (created) {
        res.send("successfuly Added");
      } else {
        throw Error("Not Added");
      }
    }
  })
);

router.post(
  "/message",
  asyncHandler(async (req, res) => {
    const { fName, lName, form_email, message } = req.body;
    if (!fName || fName == "") {
      throw Error("First Name must not be empty !");
    }
    if (!lName || lName == "") {
      throw Error("last Name must not be empty !");
    }
    if (!form_email || form_email == "") {
      throw Error("Email must not be empty !");
    }
    if (!message || message == "") {
      throw Error("Message must not be empty !");
    }

    // Lets Add message
    const newMessage = new Message({
      name: {
        fname: fName,
        lname: lName,
      },
      email: form_email,
      message,
    });

    const created = await newMessage.save();
    if (created) {
      res.send("Sended");
    } else {
      throw Error("Message not Send !");
    }
  })
);

router.get("/message", isAuthenticated, async (req, res) => {
  const messages = await Message.find();
  if (messages) {
    res.json(messages);
  } else {
    res.json([]);
  }
});

router.get(
  "/message/:id",
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const message = await Message.findOne({ _id: req.params.id });
    if (message) {
      // update
      message.readed = true;
      const updated = await message.save();
      if (updated) {
        res.send("Readed");
      } else {
        throw Error("can't Readed");
      }
    } else {
      throw Error("message not found !");
    }
  })
);

//
module.exports = router;
