const express = require("express");
const mongoose = require("mongoose");
const carRoute = require("./authRouter/carRouter");
const cors = require("cors"); 
const app = express();

app.use(express.json());

app.use("/cars", carRoute); 
app.use(cors({
  origin: "*", // Allow requests from any origin (change this for security)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));


mongoose.connect(process.env.MONGO_URI_1 || "mongodb+srv://thakursiddharth530:Siddharth@car.rfyr9.mongodb.net/?retryWrites=true&w=majority&appName=Car")
.then(() => {
    console.log("Database Connected");
}).catch(() => {
    console.log("Database Not Connected");
})

app.listen(process.env.PORT_1 || 4000, () => {
    console.log("Server Started");
})