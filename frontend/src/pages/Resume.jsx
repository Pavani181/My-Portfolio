// src/pages/Resume.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Resume() {
  const [resumePath, setResumePath] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/upload/latest").then((res) => {
      setResumePath(
        res.data.resume ? `http://localhost:5000${res.data.resume}` : ""
      );
      // dynamic resume path
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-8 text-cyan-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Resume
      </motion.h2>

      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <a
          href={resumePath || "#"}
          download
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition duration-300"
        >
          Download Resume
        </a>

        <a
          href={resumePath || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-cyan-600 text-cyan-400 hover:bg-cyan-900 rounded-lg transition duration-300"
        >
          View Online
        </a>
      </motion.div>

      {resumePath && (
        <motion.div
          className="mt-10 hidden md:block mx-auto w-full max-w-4xl h-[80vh] border border-gray-700 rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          <iframe
            src={resumePath}
            className="w-full h-full"
            title="Resume"
          ></iframe>
        </motion.div>
      )}
    </div>
  );
}
