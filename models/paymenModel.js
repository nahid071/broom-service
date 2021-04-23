const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentModel = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    in: {
      type: Boolean,
      default: false,
    },
    out: {
      type: Boolean,
      default: false,
    },
    method: {
      type: String,
      required: true,
    },
    info: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Payment = mongoose.model("payments", paymentModel);
