const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// handle route
router.get("/", (req, res) => {
  res.send("Good Job");
});

// Send Wellcome message
router.post("/wellcome", async (req, res) => {
  // send wellcome message
  const { number, countryCode } = req.body;

  if (!number || number === "") {
    throw Error("Phone Number must not be empty !");
  }

  if (!countryCode || countryCode === "") {
    throw Error("Phone Number must not be empty !");
  }

  const message = await client.messages.create({
    body: `Wellcome  ${number} , thank your for choosing us`,
    messagingServiceSid,
    to: `${countryCode}${number}`,
  });

  console.log(message);
  res.json(message);
});

// verify user
router.get("/verify", (req, res) => {
  // send wellcome message
});

// user payment and manage job link
router.get("/user-payment-link", (req, res) => {
  // send wellcome message
});

// contructor payment and manage job
router.get("/contructor-payment-request", (req, res) => {
  // send wellcome message
});

// user cancel job
router.get("/user-cancel-job", (req, res) => {
  // send wellcome message
});

// contructor cancel job
router.get("/contructor-cancel-job", (req, res) => {
  // send wellcome message
});

module.exports = router;
