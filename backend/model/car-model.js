const mongoose = require("mongoose");


const carModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    models: {
        type: [String],
        required: true
    },
    fuelType: {
        type: [String],
        enum: ["fuel", "diesel"],
        required: true
    },
    transmissionType: {
        type: [String],
        enum: ["manual", "automatic"],
        required: true
    }
});

module.exports = mongoose.model("Car", carModel);
