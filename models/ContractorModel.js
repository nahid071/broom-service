const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contractorsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    ratings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contractor-ratings",
      default: null,
    },
    jobName: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    photo: {
      type: String,
    },
    rate: {
      type: Number,
      required: true,
    },
    // Not Required

    availableTime: {
      type: Array,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Contractor = mongoose.model("contractors", contractorsSchema);
