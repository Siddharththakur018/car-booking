const express = require("express");
const mongoose = require("mongoose");
const carRoute = require("./authRouter/carRouter");
const cors = require("cors"); 
const app = express();

app.use(cors({
  origin: "https://frontend-6tmh8ktti-siddharths-projects-a1e22d04.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true, 
}));

app.use(express.json());


app.use("/cars", carRoute); 

mongoose.connect(process.env.MONGO_URI_1 || "mongodb+srv://thakursiddharth530:Siddharth@car.rfyr9.mongodb.net/?retryWrites=true&w=majority&appName=Car")
.then(() => {
    console.log("✅ Database Connected");
})
.catch((err) => {
    console.error("❌ Database Not Connected", err);
});


const PORT = process.env.PORT_1 || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server Started on Port ${PORT}`);
});
