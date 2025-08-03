import Certificate from "../models/Certificate.js";

export const getCertificates = async (req, res) => {
  const certs = await Certificate.find().sort({ createdAt: -1 });
  res.json(certs);
};

export const addCertificate = async (req, res) => {
  const newCert = new Certificate(req.body);
  const saved = await newCert.save();
  res.status(201).json(saved);
};

export const deleteCertificate = async (req, res) => {
  await Certificate.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
