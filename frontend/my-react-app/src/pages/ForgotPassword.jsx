 import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <--- added Link here
import api from "../services/api";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

   try {
    const res = await api.put('/auth/forgetPassword', {
      email,
      newPassword
    });

    toast.success(res.data.message || "Password updated successfully!");
    setEmail('');
    setNewPassword('');

    setTimeout(() => {
      navigate('/login');
    }, 1500); // redirect after toast shows

  } catch (err) {
    console.error(err);
    const msg = err.response?.data?.message || "Failed to update password.";
    toast.error(msg);
  } finally {
    setLoading(false);
  }
  };


  return (
    <div 
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070")',
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
            Reset Password
          </h2>
          <p className="text-xl text-gray-200 mb-6">
            Don't worry, we'll help you recover it
          </p>
          <p className="text-sm text-gray-300">
            <Link to="/login" className="font-medium text-indigo-300 hover:text-indigo-200 transition-colors duration-200">
              Remember your password? Sign in
            </Link>
          </p>
        </div>

        <div className="bg-white bg-opacity-95 backdrop-blur-sm py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                } transition-colors duration-200`}
              >
                {loading ? "Processing..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}