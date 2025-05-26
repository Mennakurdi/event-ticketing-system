 import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const res = await api.get('/v1/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser({
          name: res.data.name || res.data.username || '',
          email: res.data.email || '',
          role: res.data.role || '',
        });
      } catch (err) {
        toast.error(err.response?.data?.message || err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading your profile...</p>;
  }

  // Role-based authorization: only 'user' role can edit profile
  if (user.role !== 'user') {
    return (
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p className="mt-4 text-red-600 font-semibold">
          You are not authorized to edit this profile.
        </p>
        <button
          onClick={() => navigate('/event2')}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate('/update-profile')}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>

        <button
          onClick={() => navigate('/event2')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Events
        </button>
      </div>
    </div>
  );
}