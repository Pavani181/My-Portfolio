// models/Upload.js
import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["resume", "profile"],
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Upload", uploadSchema);
