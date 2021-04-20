const router = require("express").Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("./../models/UserModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { isAuthenticated } = require("./../middleware/auth");
//
//    Validation Schema
//
// Login Form Validator
const loginSchema = Joi.object({
  phone: Joi.string().required(),
  password: Joi.string().required(),
});

router.get("/", (req, res) => {
  res.send(" Lets Authenticat you");
});

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const errors = loginSchema.validate(req.body);
    if (errors.error) {
      return res.json(errors.error.details[0].message);
    }

    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.json({ s: false, m: "Phone Number Not Found ! " });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      // Login success
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_VERIFY
      );
      return res.json({
        s: true,
        token,
        user: { name: user.name, phone },
      });
    } else {
      // Invalid Password
      return res.json({ s: false, m: "password incorrect " });
    }
  })
);

router.post("/verify", isAuthenticated, (req, res) => {
  res.json({
    s: true,
    token: req.body.token,
    user: req.user,
  });
  // verify Token
});

// // reset password
// router.post("/reset", async (req, res) => {
//   const { lavel, phone, password } = req.body;
//   if (
//     !lavel ||
//     lavel === "" ||
//     !phone ||
//     phone === "" ||
//     !password ||
//     password === ""
//   ) {
//     return res.json({ s: false, m: "Please check All the Field Carefully" });
//   }

//   // check phone Verified while reseting
//   const verified = await SendResetOtp.findOne({
//     number: phone,
//     verified: true,
//   });

//   if (!verified) {
//     return res.json({ s: false, m: "Phone is not verified properly" });
//   }
//   if (lavel === "admin") {
//     const findAdmin = await Admin.findOne({ phone });
//     if (!findAdmin) {
//       return res.json({
//         s: false,
//         m: "Admin Not Found with this Phone Number",
//       });
//     }

//     findAdmin.password = await bcrypt.hash(password, 10);

//     const updated = await findAdmin.save();
//     if (updated) {
//       // Remove Reset OTP data
//       verified.count = 0;
//       verified.verified = false;
//       await verified.save();

//       return res.json({
//         s: true,
//         m: "Password reseted Successfully",
//       });
//     } else {
//       return res.json({
//         s: false,
//         m: "Password not reset",
//       });
//     }
//   } else {
//     // staff
//     const findStaff = await Staff.findOne({ phone });
//     if (!findStaff) {
//       return res.json({
//         s: false,
//         m: "Staff Not Found with this Phone Number",
//       });
//     }

//     findStaff.password = await bcrypt.hash(password, 10);

//     const updated = await findStaff.save();
//     if (updated) {
//       verified.count = 0;
//       verified.verified = false;
//       await verified.save();

//       return res.json({
//         s: true,
//         m: "Password reseted Successfully",
//       });
//     } else {
//       return res.json({
//         s: false,
//         m: "Password not reset",
//       });
//     }
//   }

//   // verify Token
// });

// Make new Password
// bcrypt.hash("ffffff", 10).then((pass) => {
//   console.log(pass);
// });fa

module.exports = router;
