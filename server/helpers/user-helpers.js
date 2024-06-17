const User = require("../models/User");
const Ticket = require("../models/Ticket");

const findUserById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    console.error(`Error finding user with ID ${userId}:`, error);
    throw new Error(`Error finding user with ID ${userId}`);
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
    console.error(`Error creating ticket for user ID ${userId}:`, error);
    throw new Error(`Error creating ticket for user ID ${userId}`);
  }
};

const associateTicketWithUser = async (user, ticketId) => {
  try {
    user.tickets.push(ticketId);
    await user.save();
  } catch (error) {
    console.error(
      `Error associating ticket ID ${ticketId} with user ID ${user._id}:`,
      error
    );
    throw new Error(`Error associating ticket ID ${ticketId} with user`);
  }
};

module.exports = {
  findUserById,
  createTicket,
  associateTicketWithUser,
};
