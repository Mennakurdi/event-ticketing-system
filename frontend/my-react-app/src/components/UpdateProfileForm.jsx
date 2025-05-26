 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function UpdateProfileForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const res = await api.get('/v1/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setFormData({
          name: res.data.name || res.data.username || '',
          email: res.data.email || '',
        });
      } catch (err) {
        toast.error(err.response?.data?.message || err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format before submitting
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await api.put('/v1/users/profile', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      toast.success("Profile updated successfully!");
      navigate('/profile');  // Redirect back to profile page
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}