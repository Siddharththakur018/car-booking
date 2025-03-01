const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();  // ✅ Load environment variables from .env

const generateToken = (userId, role) => {
  const payload = { userId, role };
  const secretKey = process.env.JWT_SECRET || "Siddharth";  // ✅ Use env variable for security
  const options = { expiresIn: "1hr" };
  return jwt.sign(payload, secretKey, options);
};

// ✅ Use environment variables instead of hardcoded values
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

// ✅ Signup Route (Send OTP)
router.post("/signup", async (req, res) => {
  try {
    const { number } = req.body;

    if (!number) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // ✅ Send OTP via Twilio
    const verification = await client.verify.v2.services(serviceSid)
      .verifications
      .create({ to: number, channel: "sms" });

    res.status(200).json({ message: "OTP Sent", sid: verification.sid });
  } catch (error) {
    console.error("Error in /signup route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Verify OTP Route
router.post("/verify", async (req, res) => {
  try {
    const { number, otp } = req.body;

    if (!number || !otp) {
      return res.status(400).json({ error: "Phone number and OTP are required" });
    }

    // ✅ Verify OTP via Twilio
    const verificationCheck = await client.verify.v2.services(serviceSid)
      .verificationChecks
      .create({ to: number, code: otp });

    if (verificationCheck.status === "approved") {
      let user = await User.findOne({ number });

      if (!user) {
        user = await User.create({ username: `User${number}`, number });
      }
      const token = generateToken(user._id, user.role);
      res.status(200).json({ message: "OTP Verified Successfully", token, user });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error in /verify route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
