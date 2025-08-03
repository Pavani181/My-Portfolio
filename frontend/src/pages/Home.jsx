// src/pages/Home.jsx
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { motion } from "framer-motion";

export default function Home() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Full Stack Developer",
        "MERN Stack Enthusiast",
        "Lifelong Learner",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => typed.destroy(); // Clean up
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] px-4 text-center">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-cyan-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hi, I'm Pavani Pantula
      </motion.h1>

      <motion.div
        className="mt-4 text-xl md:text-2xl text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <span ref={typedRef}></span>
      </motion.div>

      <motion.p
        className="mt-6 max-w-xl text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Passionate about building scalable web applications and delightful user
        experiences.
      </motion.p>

      <motion.a
        href="/api/projects"
        className="mt-8 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        View Projects
      </motion.a>
    </div>
  );
}
