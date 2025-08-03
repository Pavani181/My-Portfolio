import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

export const addProject = async (req, res) => {
  const newProject = new Project(req.body);
  const saved = await newProject.save();
  res.status(201).json(saved);
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
