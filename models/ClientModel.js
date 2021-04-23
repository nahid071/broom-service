const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const clientSchema = new Schema(
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
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Client = mongoose.model("clients", clientSchema);
