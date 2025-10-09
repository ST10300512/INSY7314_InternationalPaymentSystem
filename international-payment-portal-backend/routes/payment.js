import express from "express";
import Payment from "../models/Payment.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Submit Payment
router.post("/submit", verifyToken, async (req, res) => {
  try {
    const { amount, currency, provider, payeeAccount, swiftCode } = req.body;
    const payment = new Payment({
      userId: req.user.id,
      amount,
      currency,
      provider,
      payeeAccount,
      swiftCode,
      status: "Submitted",
    });
    await payment.save();
    res.status(201).json({ message: "Payment submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Payments (for employee)(Not yet implemented for user)
router.get("/", verifyToken, async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
});

export default router;
