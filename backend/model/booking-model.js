const mongoose = require("mongoose");
const Car = require("../model/car-model");
const Service = require("../model/service-model");

const bookingSchema = new mongoose.Schema({
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true }, // ✅ Car ka reference
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true }, // ✅ Service ka reference
    appointmentDate: { type: Date, required: true, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) }, // ✅ Next available day (N+1)
    status: { type: String, enum: ["Pending", "Confirmed", "Completed"], default: "Pending" } // ✅ Status tracking
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
