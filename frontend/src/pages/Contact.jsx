import { useState } from "react";
import { motion } from "framer-motion";
import axios from "../axiosInstance";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // success | error | null

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "/api/contact",
        formData
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-[#0f0f0f] text-white">
      <motion.h2
        className="text-4xl font-bold text-center text-cyan-400 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contact Me
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto space-y-6 bg-[#1a1a1a] p-8 rounded-lg shadow-lg border border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <label htmlFor="name" className="block mb-2 text-sm text-gray-300">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-[#0f0f0f] border border-gray-600 text-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-[#0f0f0f] border border-gray-600 text-white"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 text-sm text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-[#0f0f0f] border border-gray-600 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition text-white font-semibold"
        >
          Send Message
        </button>

        {status === "success" && (
          <p className="text-green-400 text-center mt-2">
            Message sent successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-center mt-2">
            Something went wrong. Try again later.
          </p>
        )}
      </motion.form>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl mb-4 text-cyan-300">Connect with me</h3>
        <div className="flex justify-center gap-6 text-gray-300 text-2xl">
          <a
            href="https://github.com/pavani181"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/pavani pantula"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="mailto:pavanipantula02@gmail.com"
            className="hover:text-white"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
