const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookingRoutes = require("./authRouter/bookingRouter");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/bookings", bookingRoutes);

// Connect to MongoDB
mongoose.connect("mongodb+srv://thakursiddharth530:Siddharth@bookingservice.okcu2.mongodb.net/?retryWrites=true&w=majority&appName=BookingService")
    .then(() => console.log("✅ Database Connected"))
    .catch(() => console.log("❌ Database Not Connected"));

// Start Server
app.listen(5000, () => console.log("🚀 Server Started on port 5000"));
