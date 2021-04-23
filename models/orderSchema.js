const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    serial: {
      type: Number,
      required: true,
    },
    // as username
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "clients",
      required: true,
    },
    contractorId: {
      type: Schema.Types.ObjectId,
      ref: "contractors",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "payments",
    },
    // 1 = new
    // 2 = on-going
    // 3 = completed
    jobStatus: {
      type: Number,
      default: 1,
      required: true,
    },
    commissionRate: {
      type: Number,
      required: true,
    },
    // is Contractor Paid
    contractorPaid: {
      type: Boolean,
      default: false,
    },
    declined: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Order = mongoose.model("orders", orderSchema);
