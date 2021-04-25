const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aboutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports.About = mongoose.model("about", aboutSchema);
