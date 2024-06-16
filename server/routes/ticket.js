const router = require("express").Router();

const {
  createNewTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  deleteTicket,
  addAdminReply,
} = require("../controllers/ticket-controller");

router.route("/get-tickets").post(getAllTickets);
router.route("/create-ticket").post(createNewTicket);
router.route("/get-ticket/:id").get(getTicketById);
router.route("/update-ticket-status/:id").put(updateTicketStatus);
router.route("/delete-ticket/:id").delete(deleteTicket);
router.route("/add-admin-reply/:id").post(addAdminReply);

module.exports = router;
