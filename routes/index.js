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

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

router.get(
  "/service-contractors",
  paginatedResults(Contractor),
  async (req, res) => {
    //const contractors = await Contractor.find().lean().populate("ratings");
    res.json(res.paginatedResults);
  }
);

router.get("/services", async (req, res) => {
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
