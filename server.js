require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

// Import Routes
const roomRoutes = require("./routes/roomRouter");
const contactRouter = require("./routes/contactRouter");
const bookingRouter = require("./routes/bookingRouter");
const authRouter = require("./routes/authRouter");

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ✅ Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/contact", contactRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ✅ Connect DB and Start Server
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected Successfully");

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );

    // 🔴 Graceful Shutdown
    process.on("SIGINT", async () => {
      console.log("\n🔴 Server shutting down...");
      server.close(() => console.log("🔴 HTTP server closed."));
      await mongoose.connection.close();
      console.log("🔴 MongoDB connection closed.");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
