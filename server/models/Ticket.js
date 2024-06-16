// models/Ticket.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true, enum: ["Low", "Medium", "High"] },
  id: { type: Number, required: true, unique: true },
  status: {
    type: String,
    required: true,
    enum: ["new", "proggress", "resolved"],
  },
  createdAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
