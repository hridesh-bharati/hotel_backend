const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  confirmBooking,
  processBooking,
  cancelBooking,
  deleteBooking,
} = require("../controllers/bookingController");

// Routes
router.get("/", getAllBookings);
router.post("/", createBooking);
router.patch("/:id/confirm", confirmBooking);
router.patch("/:id/process", processBooking);
router.patch("/:id/cancel", cancelBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
