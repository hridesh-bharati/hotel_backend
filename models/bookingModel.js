const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', // Assuming you have a Room model for reference
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  nights: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  aadharNo: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending', // Default status is "Pending"
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
