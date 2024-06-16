const router = require("express").Router();

const {
  createNewTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  deleteTicket,
} = require("../controllers/ticket-controller");

router.route("/").get(getAllTickets);
router.route("/create-ticket").post(createNewTicket);
router.route("/get-ticket/:id").get(getTicketById);
router.route("/update-ticket-status/:id").put(updateTicketStatus);
router.route("/delete-ticket/:id").delete(deleteTicket);

module.exports = router;
