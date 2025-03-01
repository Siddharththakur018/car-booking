const Booking = require("../model/booking-model");
const mongoose = require("mongoose");

const addBooking = async (req, res) => {
    try {
        console.log("Incoming Data:", req.body);

        let { carId, serviceId } = req.body;

        if (!carId || !serviceId) {
            return res.status(400).json({ message: "Car ID and Service ID are required" });
        }

        console.log(`Received carId: ${carId}, serviceId: ${serviceId}`);

        if (!mongoose.Types.ObjectId.isValid(carId) || !mongoose.Types.ObjectId.isValid(serviceId)) {
            return res.status(400).json({ message: "Invalid Car ID or Service ID" });
        }

        carId = new mongoose.Types.ObjectId(carId);
        serviceId = new mongoose.Types.ObjectId(serviceId);

        const today = new Date();
        const appointmentDate = new Date(today);
        appointmentDate.setDate(today.getDate() + 1);

        const newBooking = await Booking.create({
            carId,
            serviceId,
            appointmentDate,
            status: "Confirmed"
        });

        console.log("New Booking Created:", newBooking);
        res.status(201).json({ message: "Booking Successful", booking: newBooking });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get Bookings by Car ID
const getBookings = async (req, res) => {
    try {
        const carId = req.params.carId;
        console.log("Car ID from API:", carId);

        if (!mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(400).json({ message: "Invalid Car ID" });
        }

        const booking = await Booking.findOne({ carId: new mongoose.Types.ObjectId(carId) })
            .populate("carId") // Car details bhi laane ke liye
            .populate("serviceId"); // ✅ Service details bhi laane ke liye

        console.log("Booking Found:", booking);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json(booking);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// ✅ Get All Bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("carId") // Car details bhi laane ke liye
            .populate("serviceId"); // ✅ Service details bhi laane ke liye
        res.json(bookings);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { addBooking, getBookings, getAllBookings };
