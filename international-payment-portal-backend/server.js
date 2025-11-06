//Imports and Setup for HTTPS Server
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

// Helmet: Prevents Clickjacking, XSS, MIME-type sniffing
app.use(helmet());

// CORS: Controls cross-origin requests (Prevents unauthorized API access)
app.use(cors());

// Limits JSON body size to prevent large payload DDoS attacks
app.use(express.json({ limit: "10kb" }));

// Custom NoSQL Injection Sanitizer (replaces express-mongo-sanitize)
app.use((req, res, next) => {
  const sanitize = (obj) => {
    for (let key in obj) {
      if (key.startsWith("$") || key.includes(".")) {
        delete obj[key]; // removes dangerous keys like $gt or $set
      } else if (typeof obj[key] === "object") {
        sanitize(obj[key]); // recursively sanitize nested objects
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);
  next();
});

// Rate Limiting: Prevents brute-force login & DDoS attacks
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max requests per IP
    message: "Too many requests, please try again later.",
  })
);

// Enforce HSTS: Prevents MITM attacks by forcing HTTPS
app.use(
  helmet.hsts({
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  })
);

// Content Security Policy (CSP): Prevents Cross-Site Scripting (XSS)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'"],
      connectSrc: ["'self'", "https://localhost:5000"],
    },
  })
);

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);

// HTTPS SERVER CONFIGURATION
const __dirname = path.resolve();
const key = fs.readFileSync(path.join(__dirname, "certs/localhost-key.pem"));
const cert = fs.readFileSync(path.join(__dirname, "certs/localhost.pem"));
const httpsServer = https.createServer({ key, cert }, app);

const PORT = process.env.PORT || 5000;

// START HTTPS SERVER
httpsServer.listen(PORT, () => {
  console.log(`HTTPS server running securely at https://localhost:${PORT}`);
});
