import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import projectRoutes from "./routes/projects.js";
import certRoutes from "./routes/certificates.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js"; // ✅ New
import contactRoutes from "./routes/contact.js";

import { protect } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev (optional)
      "https://my-portfolio-sigma-two-51.vercel.app", // your Vercel frontend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Serve uploads folder
app.use("/uploads", express.static("public/uploads")); // ✅ Public files

app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes); // ✅ Mount upload route
app.use("/api/contact", contactRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB error:", err));
