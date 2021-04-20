const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    // as username
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disabledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = User = mongoose.model("users", adminSchema);
