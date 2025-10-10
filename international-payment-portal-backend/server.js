//Imports and Setup for HTTPS Server
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
//Prevents NoSQL Injection
import mongoSanitize from "express-mongo-sanitize";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import paymentRoutes from "./routes/payment.js";
import https from "https";
import fs from "fs";
import path from "path";

dotenv.config();
connectDB();

const app = express();


//Middleware for Security Enhancements
//Helmet helps secure HTTP headers (Prevents Clickjacking, XSS, MIME-type sniffing)
app.use(helmet());

//CORS allows controlled cross-origin requests (Prevents unauthorized API access from other origins)
app.use(cors());

//Limits JSON body size to prevent large payload DDoS attacks
app.use(express.json({ limit: "10kb" }));

//Sanitizes data to prevent NoSQL injection attacks
app.use(mongoSanitize());

//Rate limiting prevents brute-force and DDoS attacks
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: "Too many requests, please try again later.",
  })
);

//Enforce HTTPS Strict Transport Security(Prevents MITM attacks by forcing HTTPS)
app.use(
  helmet.hsts({
    maxAge: 31536000, 
    includeSubDomains: true,
    preload: true,
  })
);

//Content Security Policy (Prevents XSS attacks)
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


//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);


//HTTPS SERVER CONFIGURATION
const __dirname = path.resolve();
const key = fs.readFileSync(path.join(__dirname, "certs/localhost-key.pem"));
const cert = fs.readFileSync(path.join(__dirname, "certs/localhost.pem"));
const httpsServer = https.createServer({ key, cert }, app);

const PORT = process.env.PORT || 5000;


//START HTTPS SERVER
httpsServer.listen(PORT, () => {
  console.log(`HTTPS server running securely at https://localhost:${PORT}`);
});
