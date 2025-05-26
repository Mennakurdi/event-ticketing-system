 import React, { useEffect, useState } from "react";

import api from "../services/api";
function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/v1/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Failed to fetch events", err));
  }, []);
   const handleLogout = async () => {
  try {
    await api.get('/auth/logout');
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate('/'); // <-- redirect to Events page after logout
  } catch (err) {
    console.error(err);
    toast.error("Logout failed");
  }
};
  return (
    <div>
      <h1>Events Page</h1>
      {events.length === 0 ? (
        <p>Loading events...</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id}>{event.title} - {event.date}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Events;