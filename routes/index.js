const router = require("express").Router();
const Contractor = require("./../models/ContractorModel");
const asyncHandler = require("express-async-handler");
router.get("/", (req, res) => {
  res.render("home");
});

router.get("/approve", (req, res) => {
  res.render("approve");
});

router.get(
  "/profile-booking-:id",
  asyncHandler(async (req, res) => {
    const contractor = await Contractor.findById(req.params.id);
    if (contractor) {
      res.render("profile-booking", {
        contractor,
      });
    } else {
      res.render("404");
    }
  })
);

router.get("/request", (req, res) => {
  res.render("request");
});

router.get("/services", (req, res) => {
  res.render("services");
});

// about contact policies

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/policies", (req, res) => {
  res.render("policies");
});

module.exports = router;
