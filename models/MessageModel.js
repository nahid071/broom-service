const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema(
  {
    serial: {
      type: Number,
      default: 0,
    },
    name: {
      fname: {
        type: String,
        required: true,
      },
      lname: {
        type: String,
        required: true,
      },
    },
    email: {
      type: String,
    },
    message: {
      type: String,
    },
    readed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Message = mongoose.model("messages", messageSchema);
