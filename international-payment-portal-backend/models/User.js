import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  idNumber: { type: String, required: true },
  accountNumber: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["customer", "employee"], default: "customer" }
});

export default mongoose.model("User", userSchema);
