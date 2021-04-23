const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const smsSchema = new Schema(
  {
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "clients",
    },
    contractorId: {
      type: Schema.Types.ObjectId,
      ref: "contractors",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Sms = mongoose.model("sms", smsSchema);
