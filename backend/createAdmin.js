import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js"; // ✅ You missed this
dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const admin = new Admin({
  email: "pavanipantula02@gmail.com",
  password: "admin123", // This will be hashed in the schema pre-save hook
});

await admin.save();
console.log("✅ Admin created");
process.exit();
