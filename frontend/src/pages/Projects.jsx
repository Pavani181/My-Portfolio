// src/pages/Projects.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects").then((res) => {
      setProjects(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen px-6 py-20 bg-[#0f0f0f] text-white">
      <motion.h2
        className="text-4xl font-bold text-cyan-400 mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project._id || index}
            className="bg-[#1a1a1a] p-6 rounded-xl shadow-md hover:shadow-cyan-700 transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-cyan-300 mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-gray-400 mb-1">{project.type}</p>
            <p className="text-gray-300 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-cyan-800 text-white px-2 py-1 text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline text-sm"
              >
                View Project →
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
