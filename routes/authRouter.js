const express = require("express");
const router = express.Router();
const {
  register,
  login,
  changePassword,
  fetchAdmins,
  deleteAdmin,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", authMiddleware, changePassword);
router.get("/admins", authMiddleware, fetchAdmins);
router.delete("/admins/:id", authMiddleware, deleteAdmin); // ✅ secured route

module.exports = router;
