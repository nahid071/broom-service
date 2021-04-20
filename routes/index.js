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

module.exports = router;
