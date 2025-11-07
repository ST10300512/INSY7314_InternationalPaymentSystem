import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { fullName, idNumber, accountNumber, password } = req.body;
    const existingUser = await User.findOne({ accountNumber });
    if (existingUser) return res.status(400).json({ message: "Account already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, idNumber, accountNumber, passwordHash: hashed });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { accountNumber, password } = req.body;
    const user = await User.findOne({ accountNumber });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "60m" });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
