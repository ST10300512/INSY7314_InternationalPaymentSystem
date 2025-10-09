//imports and setup for HTTPS server

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";
import https from "https";
import fs from "fs";
import path from "path";

dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);


//HTTPS Configuration

const __dirname = path.resolve();
const key = fs.readFileSync(path.join(__dirname, "certs/localhost-key.pem"));
const cert = fs.readFileSync(path.join(__dirname, "certs/localhost.pem"));
const httpsServer = https.createServer({ key, cert }, app);

const PORT = process.env.PORT || 5000;

//HTTPS server
httpsServer.listen(PORT, () => {
  console.log(`HTTPS server running securely at https://localhost:${PORT}`);
});

