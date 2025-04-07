const express = require("express");
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

const router = express.Router();

router.post("/", createRoom); // Add a new room
router.get("/", getAllRooms); // Get all rooms
router.get("/:id", getRoomById); // Get room by ID
router.put("/:id", updateRoom); // Update a room
router.delete("/:id", deleteRoom); // Delete a room

module.exports = router;
