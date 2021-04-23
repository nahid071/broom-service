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
      type: Schema.Types.ObjectId,
      ref: "ratings",
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
    availableDay: {
      type: Array,
      required: true,
    },
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
