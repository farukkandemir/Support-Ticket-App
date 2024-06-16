const User = require("../models/User");
const Ticket = require("../models/Ticket");

const findUserById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw new Error("Error finding user");
  }
};

const createTicket = async (ticketData, userId) => {
  try {
    const newTicket = new Ticket({
      ...ticketData,
      user: userId,
    });
    return await newTicket.save();
  } catch (error) {
    throw new Error("Error creating ticket");
  }
};

const associateTicketWithUser = async (user, ticketId) => {
  try {
    user.tickets.push(ticketId);
    await user.save();
  } catch (error) {
    throw new Error("Error associating ticket with user");
  }
};

module.exports = {
  findUserById,
  createTicket,
  associateTicketWithUser,
};
