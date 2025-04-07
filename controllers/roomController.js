const Room = require("../models/addRoom.js");

// Create a new room
const createRoom = async (req, res) => {
  try {
    const { address, country, type, price, date, description, imgSrc } =
      req.body;

    if (!address || !country || !price) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const newRoom = new Room({
      address,
      country,
      type,
      price,
      date,
      description,
      imgSrc,
    });
    await newRoom.save();

    res.status(201).json({ message: "Room added successfully", room: newRoom });
  } catch (error) {
    console.error("Error adding room:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get a single room by ID (needed for editing)
const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update room
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoom = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    res
      .status(200)
      .json({ message: "Room updated successfully", room: updatedRoom });
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a room
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoom = await Room.findByIdAndDelete(id);

    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
