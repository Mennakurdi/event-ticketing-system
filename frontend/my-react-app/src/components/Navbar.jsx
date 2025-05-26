import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function Navbar({ minimal = false }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  

  const handleLogout = async () => {
    try {
      await api.get('/auth/logout');
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      toast.success("Logged out successfully");
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  if (!isLoggedIn) {
    return (
      <nav className="bottom-navbar flex gap-4 mb-4">
        <NavLink to="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </NavLink>
        <NavLink to="/register">
          <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
        </NavLink>
      </nav>
    );
  }

  return (
    <nav className="bottom-navbar flex gap-4 mb-4">
      {minimal ? (
        <>
          <NavLink to="/profile">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">Profile</button>
          </NavLink>
          {role === 'admin' && (
            <NavLink to="/admin/users">
              <button className="bg-yellow-600 text-white px-4 py-2 rounded">Admin Dashboard</button>
            </NavLink>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/">
            <button className="bg-gray-700 text-white px-4 py-2 rounded">Home</button>
          </NavLink>
          <NavLink to="/profile">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">Profile</button>
          </NavLink>
          {role === 'admin' && (
            <NavLink to="/admin/users">
              <button className="bg-yellow-600 text-white px-4 py-2 rounded">Admin Dashboard</button>
            </NavLink>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

