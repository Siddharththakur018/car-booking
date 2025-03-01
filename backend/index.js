const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  // ✅ Import CORS
const authRouter  = require("./authRouter/auth");

const app = express();

// ✅ Use CORS Middleware
app.use(cors({
  origin: "*", // Allow requests from any origin (change this for security)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Hello");
});

// ✅ Use Environment Variable for Database Connection
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://thakursiddharth530:Siddharth@carbooking.ramhw.mongodb.net/?retryWrites=true&w=majority&appName=CarBooking")
.then(() => {
    console.log("Database Connected");
}).catch(() => {
    console.log("Database Not Connected");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started on Port 3000");
});
