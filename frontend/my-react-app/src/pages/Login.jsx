 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../services/api";
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', { email, password });

      const { token, user } = res.data;
localStorage.setItem("token", token);
localStorage.setItem("userRole", user.role); // 🔐 optional but useful

// ✅ Clean redirection based on role
if (user.role === 'admin') {
  navigate("/admin/users");
} else if (user.role === 'organizer') {
  navigate("/organizer-dashboard");
} else {
  navigate("/event2");
}
 
    } catch (err) {
      console.error("Login error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Unknown error";
      alert("Login failed: " + errorMsg);
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'auto'
      }}
      className="flex items-center justify-center"
    >
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-white mb-3">
            Online Ticket Hub
          </h2>
          <p className="text-xl text-gray-200 mb-6">
            Your gateway to amazing events
          </p>
          <p className="text-sm text-gray-300">
            <Link to="/register" className="font-medium text-indigo-300 hover:text-indigo-200 transition-colors duration-200">
              Create a new account
            </Link>
          </p>
        </div>

        <div className="bg-white bg-opacity-95 backdrop-blur-sm py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
