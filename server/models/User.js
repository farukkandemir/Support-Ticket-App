const mongoose = require("mongoose");
const Ticket = require("../models/Ticket");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Ticket,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
