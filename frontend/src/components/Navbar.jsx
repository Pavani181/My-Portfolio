import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-cyan-400">
          My Portfolio
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-cyan-400">
            Home
          </Link>
          <Link to="/about" className="hover:text-cyan-400">
            About
          </Link>
          <Link to="/projects" className="hover:text-cyan-400">
            Projects
          </Link>
          <Link to="/resume" className="hover:text-cyan-400">
            Resume
          </Link>
          <Link to="/contact" className="hover:text-cyan-400">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
