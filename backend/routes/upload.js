import express from "express";
import multer from "multer";
import path from "path";
import { protect } from "../middleware/authMiddleware.js";
import Upload from "../models/Upload.js";

const router = express.Router();

// Configure storage for files
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Upload routes
router.post("/resume", protect, upload.single("resume"), async (req, res) => {
  const upload = new Upload({ type: "resume", filename: req.file.filename });
  await upload.save();
  res.json({
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
  });
});

router.post("/profile", protect, upload.single("profile"), async (req, res) => {
  const upload = new Upload({ type: "profile", filename: req.file.filename });
  await upload.save();
  res.json({
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
  });
});

router.get("/latest", async (req, res) => {
  const resume = await Upload.findOne({ type: "resume" }).sort({ uploadedAt: -1 });
  const profile = await Upload.findOne({ type: "profile" }).sort({ uploadedAt: -1 });

  res.json({
    resume: resume ? `/uploads/${resume.filename}` : null,
    profile: profile ? `/uploads/${profile.filename}` : null,
  });
});


export default router;
