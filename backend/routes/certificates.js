import express from "express";
import {
  getCertificates,
  addCertificate,
  deleteCertificate,
} from "../controllers/certificateController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCertificates); // Public
router.post("/", protect, addCertificate); // Protected
router.delete("/:id", protect, deleteCertificate); // Protected

export default router;
