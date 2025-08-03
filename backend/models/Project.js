// models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: String,
    type: String,
    description: String,
    tech: [String],
    link: String,
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
