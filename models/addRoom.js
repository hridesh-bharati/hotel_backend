const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  address: { type: String, required: true },
  country: { type: String, required: true },
  type: { type: String },
  price: { type: Number, required: true },
  date: { type: String }, // Ensure this matches frontend date format
  description: { type: String },
  imgSrc: { type: String }, // If you're storing image URLs
});

module.exports = mongoose.model("Room", roomSchema);
