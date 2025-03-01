const express = require("express");
const mongoose = require("mongoose");
const serviceRouter = require("./authRouter/carService")

const app = express();
app.use(express.json());

app.use("/service", serviceRouter)

mongoose.connect("mongodb+srv://thakursiddharth530:Siddharth@carservice.3fjfm.mongodb.net/?retryWrites=true&w=majority&appName=CarService")
.then(() => {
    console.log("Database Connected")
}).catch(() => {
    console.log("Database Not Connected")
})

app.listen(5001, () => {
    console.log("Server Started");
})