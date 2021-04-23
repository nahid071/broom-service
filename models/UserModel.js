const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // as username
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
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
module.exports = User = mongoose.model("users", adminSchema);
