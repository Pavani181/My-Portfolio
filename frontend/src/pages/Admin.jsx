import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [projectData, setProjectData] = useState({
    title: "",
    type: "",
    description: "",
    tech: "",
    link: "",
  });
  const [certData, setCertData] = useState({ title: "", issuer: "", year: "" });

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem("token");
      const authHeader = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const p = await axios.get(
        "http://localhost:5000/api/projects",
        authHeader
      );
      const c = await axios.get(
        "http://localhost:5000/api/certificates",
        authHeader
      );
      setProjects(p.data);
      setCertificates(c.data);
    } catch (err) {
      console.error("Fetch failed:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized. Please login again.");
      navigate("/login");
    } else {
      fetchAll();
    }
  }, []);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const authHeader = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        "http://localhost:5000/api/projects",
        {
          ...projectData,
          tech: projectData.tech.split(",").map((t) => t.trim()),
        },
        authHeader
      );
      setProjectData({
        title: "",
        type: "",
        description: "",
        tech: "",
        link: "",
      });
      fetchAll();
    } catch (err) {
      console.error("Add project failed:", err.response?.data || err.message);
    }
  };

  const handleCertSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const authHeader = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        "http://localhost:5000/api/certificates",
        certData,
        authHeader
      );
      setCertData({ title: "", issuer: "", year: "" });
      fetchAll();
    } catch (err) {
      console.error(
        "Add certificate failed:",
        err.response?.data || err.message
      );
    }
  };

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const authHeader = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `http://localhost:5000/api/projects/${id}`,
        authHeader
      );
      fetchAll();
    } catch (err) {
      console.error(
        "Delete project failed:",
        err.response?.data || err.message
      );
    }
  };

  const deleteCert = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const authHeader = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `http://localhost:5000/api/certificates/${id}`,
        authHeader
      );
      fetchAll();
    } catch (err) {
      console.error(
        "Delete certificate failed:",
        err.response?.data || err.message
      );
    }
  };

  const handleFileUpload = async (e, field) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append(field, e.target[field].files[0]);

      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/upload/${field}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert(`${field === "resume" ? "Resume" : "Profile photo"} uploaded!`);
      e.target.reset();
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen px-6 py-16 bg-[#0f0f0f] text-white relative">
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        className="absolute top-6 right-6 text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <motion.h2
        className="text-4xl font-bold text-cyan-400 mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Admin Panel
      </motion.h2>

      {/* ---------- Add Project ---------- */}
      <section className="mb-12">
        <h3 className="text-2xl text-cyan-300 mb-4">Add New Project</h3>
        <form
          onSubmit={handleProjectSubmit}
          className="grid gap-4 md:grid-cols-2"
        >
          <input
            type="text"
            placeholder="Title"
            value={projectData.title}
            onChange={(e) =>
              setProjectData({ ...projectData, title: e.target.value })
            }
            className="p-2 bg-[#1a1a1a] text-white rounded"
          />
          <input
            type="text"
            placeholder="Type"
            value={projectData.type}
            onChange={(e) =>
              setProjectData({ ...projectData, type: e.target.value })
            }
            className="p-2 bg-[#1a1a1a] text-white rounded"
          />
          <input
            type="text"
            placeholder="Technologies (comma separated)"
            value={projectData.tech}
            onChange={(e) =>
              setProjectData({ ...projectData, tech: e.target.value })
            }
            className="p-2 bg-[#1a1a1a] text-white rounded"
          />
          <input
            type="text"
            placeholder="Link (optional)"
            value={projectData.link}
            onChange={(e) =>
              setProjectData({ ...projectData, link: e.target.value })
            }
            className="p-2 bg-[#1a1a1a] text-white rounded"
          />
          <textarea
            placeholder="Description"
            value={projectData.description}
            onChange={(e) =>
              setProjectData({ ...projectData, description: e.target.value })
            }
            className="p-2 bg-[#1a1a1a] text-white rounded md:col-span-2"
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded md:col-span-2"
          >
            Add Project
          </button>
        </form>
      </section>

      {/* ---------- Existing Projects ---------- */}
      <section className="mb-12">
        <h4 className="text-xl text-gray-200 mb-3">Existing Projects</h4>
        {projects.map((proj) => (
          <div
            key={proj._id}
            className="bg-[#1a1a1a] p-4 mb-2 rounded border border-gray-700 flex justify-between"
          >
            <div>
              <p className="font-semibold">{proj.title}</p>
              <p className="text-sm text-gray-400">{proj.type}</p>
            </div>
            <button
              onClick={() => deleteProject(proj._id)}
              className="text-red-500 hover:text-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </section>

      {/* ---------- Add Certificate ---------- */}
      <section className="mb-12">
        <h3 className="text-2xl text-cyan-300 mb-4">Add Certificate</h3>
        <form onSubmit={handleCertSubmit} className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Title"
            value={certData.title}
            onChange={(e) =>
              setCertData({ ...certData, title: e.target.value })
            }
            className="p-2 bg-[#1a1a1a] text-white rounded"
          />
          <input
            type="text"
            placeholder="Issuer"
            value={certData.issuer}
            onChange={(e) =>
              setCertData({ ...certData, issuer: e.target.value })
            }
            className="p-2 bg-[#1a1a1a] text-white rounded"
          />
          <input
            type="text"
            placeholder="Year"
            value={certData.year}
            onChange={(e) => setCertData({ ...certData, year: e.target.value })}
            className="p-2 bg-[#1a1a1a] text-white rounded"
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded md:col-span-3"
          >
            Add Certificate
          </button>
        </form>
      </section>

      {/* ---------- Existing Certificates ---------- */}
      <section className="mb-12">
        <h4 className="text-xl text-gray-200 mb-3">Certificates</h4>
        {certificates.map((cert) => (
          <div
            key={cert._id}
            className="bg-[#1a1a1a] p-4 mb-2 rounded border border-gray-700 flex justify-between"
          >
            <div>
              <p className="font-semibold">{cert.title}</p>
              <p className="text-sm text-gray-400">{cert.issuer}</p>
            </div>
            <button
              onClick={() => deleteCert(cert._id)}
              className="text-red-500 hover:text-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </section>

      {/* ---------- Upload Files ---------- */}
      <section className="mb-12">
        <h3 className="text-2xl text-cyan-300 mb-4">Upload Files</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Upload Resume */}
          <form
            onSubmit={(e) => handleFileUpload(e, "resume")}
            className="bg-[#1a1a1a] p-4 rounded"
          >
            <label className="block mb-2 text-sm text-gray-400">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              name="resume"
              accept="application/pdf"
              required
              className="mb-4 text-white"
            />
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded"
            >
              Upload Resume
            </button>
          </form>

          {/* Upload Profile */}
          <form
            onSubmit={(e) => handleFileUpload(e, "profile")}
            className="bg-[#1a1a1a] p-4 rounded"
          >
            <label className="block mb-2 text-sm text-gray-400">
              Upload Profile Photo (JPG/PNG)
            </label>
            <input
              type="file"
              name="profile"
              accept="image/png, image/jpeg"
              required
              className="mb-4 text-white"
            />
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded"
            >
              Upload Photo
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
