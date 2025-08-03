// models/Certificate.js
import mongoose from "mongoose";

const certSchema = new mongoose.Schema(
  {
    title: String,
    issuer: String,
    year: String,
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certSchema);
