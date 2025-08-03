import { motion } from "framer-motion";

export default function Contact() {
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
            required
            className="w-full px-4 py-2 rounded bg-[#0f0f0f] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full px-4 py-2 rounded bg-[#0f0f0f] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 text-sm text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            rows="4"
            required
            className="w-full px-4 py-2 rounded bg-[#0f0f0f] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition text-white font-semibold"
        >
          Send Message
        </button>
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
            href="https://github.com/yourgithub"
            target="_blank"
            className="hover:text-white"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/yourlinkedin"
            target="_blank"
            className="hover:text-white"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:youremail@example.com" className="hover:text-white">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
