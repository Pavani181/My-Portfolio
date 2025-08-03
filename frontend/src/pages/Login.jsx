// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/admin");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">Admin Login</h2>
      <form onSubmit={handleLogin} className="w-full max-w-sm grid gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 bg-[#1a1a1a] text-white rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 bg-[#1a1a1a] text-white rounded"
        />
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
