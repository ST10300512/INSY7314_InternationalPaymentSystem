import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "./models/User.js";

console.log("🚀 Starting seed script...");
dotenv.config();

dotenv.config();

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing users (optional - comment out if you want to keep existing users)
    await User.deleteMany({});
    console.log("🗑️  Cleared existing users");

    // Hash password for all test users
    const hashedPassword = await bcrypt.hash("Password123!", 10);

    // Test Customers
    const customers = [
      {
        fullName: "John Doe",
        idNumber: "9001011234567",
        accountNumber: "1234567890",
        passwordHash: hashedPassword,
        role: "customer",
      },
      {
        fullName: "Jane Smith",
        idNumber: "8505052345678",
        accountNumber: "2345678901",
        passwordHash: hashedPassword,
        role: "customer",
      },
      {
        fullName: "Mike Johnson",
        idNumber: "9208083456789",
        accountNumber: "3456789012",
        passwordHash: hashedPassword,
        role: "customer",
      },
    ];

    // Test Employees
    const employees = [
      {
        fullName: "Sarah Williams",
        idNumber: "8803034567890",
        accountNumber: "9876543210",
        passwordHash: hashedPassword,
        role: "employee",
      },
      {
        fullName: "David Brown",
        idNumber: "9106065678901",
        accountNumber: "8765432109",
        passwordHash: hashedPassword,
        role: "employee",
      },
    ];

    // Insert all users
    const allUsers = [...customers, ...employees];
    await User.insertMany(allUsers);

    console.log("\n✅ Seeded users successfully!");
    console.log("\n📋 Test Customers:");
    customers.forEach((user) => {
      console.log(`   Account: ${user.accountNumber} | Name: ${user.fullName}`);
    });
    console.log("\n📋 Test Employees:");
    employees.forEach((user) => {
      console.log(`   Account: ${user.accountNumber} | Name: ${user.fullName}`);
    });
    console.log("\n🔑 Password for all users: Password123!\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();