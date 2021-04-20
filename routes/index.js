const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/approve", (req, res) => {
  res.render("approve");
});

router.get("/request", (req, res) => {
  res.render("request");
});

module.exports = router;
