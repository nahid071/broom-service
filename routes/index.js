const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/approve", (req, res) => {
  res.render("approve");
});

router.get("/profile-booking", (req, res) => {
  res.render("profile-booking");
});

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
