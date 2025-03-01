const express = require("express");
const router = express.Router();
const { addBooking, getBookings, getAllBookings } = require("../controller/booking-controller");

// ✅ Debugging Middleware
router.use((req, res, next) => {
    console.log("🔍 Incoming Request:", req.method, req.url, "Params:", req.params);
    next();
});

// ✅ Routes
router.post("/add", addBooking);
router.get("/car/:carId", getBookings);
router.get("/all", getAllBookings);

module.exports = router;
