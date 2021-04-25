const router = require("express").Router();
const Contractor = require("./../models/ContractorModel");
const asyncHandler = require("express-async-handler");

const Rating = (value, color, text = "") => {
  var rating = `<div className="rating">`;

  rating += `  <span> ${
    value >= 1
      ? '<i style="color:' + color + '" class="fa fa-star"></i>'
      : value >= 0.5
      ? '<i style="color:' + color + '" class="fas fa-star-half-alt"></i>'
      : '<i style="color:' + color + '" class="far fa-star"></i>'
  } </span>`;

  rating += `  <span> ${
    value >= 2
      ? '<i style="color:' + color + '" class="fa fa-star"></i>'
      : value >= 1.5
      ? '<i style="color:' + color + '" class="fas fa-star-half-alt"></i>'
      : '<i style="color:' + color + '" class="far fa-star"></i>'
  } </span>`;

  rating += `  <span> ${
    value >= 3
      ? '<i style="color:' + color + '" class="fa fa-star"></i>'
      : value >= 2.5
      ? '<i style="color:' + color + '" class="fas fa-star-half-alt"></i>'
      : '<i style="color:' + color + '" class="far fa-star"></i>'
  } </span>`;

  rating += `  <span> ${
    value >= 4
      ? '<i style="color:' + color + '" class="fa fa-star"></i>'
      : value >= 3.5
      ? '<i style="color:' + color + '" class="fas fa-star-half-alt"></i>'
      : '<i style="color:' + color + '" class="far fa-star"></i>'
  } </span>`;

  rating += `  <span> ${
    value >= 5
      ? '<i style="color:' + color + '" class="fa fa-star"></i>'
      : value >= 4.5
      ? '<i style="color:' + color + '" class="fas fa-star-half-alt"></i>'
      : '<i style="color:' + color + '" class="far fa-star"></i>'
  } </span>`;
  rating += `</div>`;

  return rating;
};

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

    // Rating
    var rating = ``;
    var totalRating = 0;
    var ratingCount = 0;
    if (contractor.ratings === null) {
      rating = Rating(0, "#db4128");
    } else {
      ratingCount =
        Array.from(contractor.ratings).reduce((acc, x) => acc + x.value, 0) /
        Array.from(contractor.ratings).length;
      rating = Rating(ratingCount, "#db4128");
      totalRating = Array.from(contractor.ratings).length;
    }
    // Rating
    if (contractor) {
      res.render("profile-booking", {
        contractor,
        rating,
        totalRating,
        ratingCount,
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
