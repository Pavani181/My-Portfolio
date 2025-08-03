export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-gray-800 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Pavani Pantula. All rights reserved.
        </div>

        <div className="flex gap-6 text-xl">
          <a
            href="mailto:pavanipantula02@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition"
            title="Email"
          >
            <i className="fas fa-envelope"></i>
          </a>
          <a
            href="https://github.com/pavani181" // replace with your actual GitHub if different
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition"
            title="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/pavani pantula/" // replace with your LinkedIn URL
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition"
            title="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
