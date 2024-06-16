const Ticket = require("../models/Ticket");

const createNewTicket = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const ticket = req.body;

  if (!ticket) {
    return res.status(400).json({
      success: false,
      message: "No ticket details provided",
    });
  }

  try {
    const newTicket = new Ticket(ticket);
    await newTicket.save();

    console.log(`Email sent for new ticket with ID: ${newTicket._id}`);

    return res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: newTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllTickets = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const tickets = await Ticket.find();

    return res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getTicketById = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "No ticket ID provided",
    });
  }

  try {
    const ticket = await Ticket.findOne({ id });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateTicketStatus = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const { id } = req.params;
  const { status } = req.body;

  if (!id || !status) {
    return res.status(400).json({
      success: false,
      message: "No ticket ID or status provided",
    });
  }

  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { id },
      { status },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    console.log(`Email sent for updated ticket with ID: ${updatedTicket._id}`);

    return res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      data: updatedTicket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteTicket = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "No ticket ID provided",
    });
  }

  try {
    const deletedTicket = await Ticket.findOneAndDelete({ id });

    if (!deletedTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createNewTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  deleteTicket,
};
