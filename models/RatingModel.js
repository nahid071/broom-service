const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ratingSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "clients",
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Rating = mongoose.model("ratings", ratingSchema);
