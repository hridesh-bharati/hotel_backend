const Booking = require('../models/bookingModel.js');
const moment = require('moment');

// ✅ Generate a random room number (example logic)
function generateRoomNumber() {
  const floor = Math.floor(Math.random() * 5) + 1;
  const room = Math.floor(Math.random() * 20) + 1;
  return `F${floor}0${room}`;
}

// ✅ Create a new booking
const createBooking = async (req, res) => {
  try {
    const { roomId, checkInDate, nights, totalPrice, aadharNo, mobileNo } = req.body;

    if (!roomId || !checkInDate || !nights || !totalPrice || !aadharNo || !mobileNo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^\d{12}$/.test(aadharNo)) {
      return res.status(400).json({ message: "Invalid Aadhar number" });
    }

    if (!/^\d{10}$/.test(mobileNo)) {
      return res.status(400).json({ message: "Invalid Mobile number" });
    }

    const newBooking = new Booking({
      roomId,
      checkInDate,
      nights,
      totalPrice,
      aadharNo,
      mobileNo,
      status: "Pending",
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully" });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// ✅ Fetch all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    const formattedBookings = bookings.map(booking => ({
      ...booking._doc,
      checkInDate: booking.checkInDate
        ? moment(booking.checkInDate).format('DD-MM-YYYY')
        : "N/A",
    }));

    res.status(200).json(formattedBookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
};

// ✅ Confirm booking
const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.status === "Confirmed") {
      return res.status(400).json({ message: "Booking already confirmed" });
    }

    booking.status = "Confirmed";
    await booking.save();

    res.status(200).json({ message: "Booking confirmed successfully" });
  } catch (err) {
    console.error("Error confirming booking:", err);
    res.status(500).json({ message: "Error confirming booking", error: err.message });
  }
};

// ✅ Process booking
const processBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "Processed";
    booking.roomAssigned = generateRoomNumber();
    booking.processedAt = new Date();

    await booking.save();

    res.status(200).json({ message: "Booking processed successfully", booking });
  } catch (err) {
    console.error("Error processing booking:", err);
    res.status(500).json({ message: "Error processing booking", error: err.message });
  }
};

// ✅ Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "Cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    console.error("Error cancelling booking:", err);
    res.status(500).json({ message: "Error cancelling booking", error: err.message });
  }
};

// ✅ Delete booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({ message: "Error deleting booking", error: err.message });
  }
};

// ✅ Export all
module.exports = {
  createBooking,
  getAllBookings,
  confirmBooking,
  processBooking,
  cancelBooking,
  deleteBooking,
};
