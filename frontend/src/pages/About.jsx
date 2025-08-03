// src/pages/About.jsx
// import { motion } from "framer-motion";
// import profilePic from "../assets/profile.jpg"; // Make sure your image is added

// const experiences = [
//   {
//     role: "Machine Learning Intern",
//     company: "SmartBridge",
//     date: "May 2024 – July 2024",
//     description:
//       "Gained practical knowledge in data analysis, preprocessing, and predictive modeling using Python libraries.",
//   },
//   {
//     role: "Full Stack Developer Intern",
//     company: "SmartBridge",
//     date: "June 2024 – July 2024",
//     description:
//       "Developed a responsive e-commerce MERN app with JWT-based authentication, dynamic UI using Tailwind, and secured REST APIs.",
//   },
// ];

// const achievements = [
//   {
//     title: "CS50's Introduction to Programming with Python",
//     issuer: "edX / Harvard University",
//     year: "2024",
//   },
//   {
//     title: "Introduction to 4.0 and Industrial IoT",
//     issuer: "NPTEL (Elite Certificate)",
//     year: "2024",
//   },
// ];

// src/pages/About.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function About() {
  const [certificates, setCertificates] = useState([]);
  const [profilePath, setProfilePath] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/certificates").then((res) => {
      setCertificates(res.data);
    });

    axios.get("http://localhost:5000/api/upload/latest").then((res) => {
      setProfilePath(
      res.data.profile ? `http://localhost:5000${res.data.profile}` : ""
      ); // dynamic profile path
    });
  }, []);

  const experiences = [
    {
      role: "Machine Learning Intern",
      company: "SmartBridge",
      date: "May 2024 – July 2024",
      description:
        "Gained practical knowledge in data analysis, preprocessing, and predictive modeling using Python libraries.",
    },
    {
      role: "Full Stack Developer Intern",
      company: "SmartBridge",
      date: "June 2024 – July 2024",
      description:
        "Developed a responsive e-commerce MERN app with JWT-based authentication, dynamic UI using Tailwind, and secured REST APIs.",
    },
  ];

  const achievements = [
    {
      title: "CS50's Introduction to Programming with Python",
      issuer: "edX / Harvard University",
      year: "2024",
    },
    {
      title: "Introduction to 4.0 and Industrial IoT",
      issuer: "NPTEL (Elite Certificate)",
      year: "2024",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <motion.h2
        className="text-4xl font-bold text-cyan-400 mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      {/* Profile */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-10 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={profilePath || "/default-profile.jpg"}
          alt="Profile"
          className="w-48 h-48 rounded-full object-cover shadow-md"
        />
        <p className="text-gray-300 text-lg leading-relaxed">
          I'm a full-stack developer skilled in the MERN stack, passionate about
          designing interactive UIs, building scalable backends, and continually
          improving my skills through real-world projects.
        </p>
      </motion.div>

      {/* Experience */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h3 className="text-2xl font-semibold text-cyan-300 mb-6">
          Experience
        </h3>
        <div className="border-l border-gray-700 pl-6">
          {experiences.map((exp, idx) => (
            <div key={idx} className="mb-8">
              <h4 className="text-xl font-bold text-white">{exp.role}</h4>
              <p className="text-sm text-gray-400">
                {exp.company} • {exp.date}
              </p>
              <p className="text-gray-300 mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certificates */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h3 className="text-2xl font-semibold text-cyan-300 mb-6">
          Certificates & Achievements
        </h3>
        <div className="grid sm:grid-cols-2 gap-6">
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              className="bg-[#1a1a1a] rounded-xl p-4 shadow hover:scale-105 transition-transform"
            >
              <h4 className="text-lg text-white font-semibold">{cert.title}</h4>
              <p className="text-sm text-gray-400">
                {cert.issuer} • {cert.year}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
