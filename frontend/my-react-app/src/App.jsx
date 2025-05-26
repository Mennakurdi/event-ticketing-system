 import React from "react";
 import AdminUsersPage from './pages/AdminUsersPage';
import AdminDashboard from './pages/AdminDashboard'; // adjust path if needed

<Route path="/admin-dashboard" element={<AdminDashboard />} />

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Events from "./pages/Events";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Event2 from "./pages/Event2";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import UpdateProfileForm from "./components/UpdateProfileForm";
import EventList from './pages/EventList'; // adjust the path according to your file structure
import EventDetails from './pages/EventDetails';  // adjust the path to where your EventDetails.jsx is

function AppContent() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/event2";
  const showFullNavbar = ["/", "/login", "/register"].includes(location.pathname);
  const showLoginOnly = location.pathname === "/forgot-password";

  return (
    <>
      {!hideNavbar && showFullNavbar && <Navbar showLoginOnly={false} />}
      {!hideNavbar && showLoginOnly && <Navbar showLoginOnly={true} />}

      <Routes>
        <Route path="/admin/users" element={<AdminUsersPage />} />

        <Route path="/" element={<Events />} />
        <Route path="/event2" element={<Event2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/profile" element={<ProfilePage />} />
         <Route path="/update-profile" element={<UpdateProfileForm />} />
         <Route path="/events" element={<EventList />} />
         <Route path="/events/:id" element={<EventDetails />} />

      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
