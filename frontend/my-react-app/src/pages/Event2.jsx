 import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function Event2() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); // Added for filtered results
  const [searchTerm, setSearchTerm] = useState(''); // Added for search input
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');  // Redirect to login if not authenticated
      return;
    }
    fetchEvents();
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/v1/events');
      setEvents(res.data);
      setFilteredEvents(res.data); // initialize filteredEvents with all events
    } catch (err) {
      console.error("Failed to fetch events:", err);
      // You can add toast error here if you use react-toastify
    } finally {
      setLoading(false);
    }
  };

  // Added: filter events when searchTerm or events change
  useEffect(() => {
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  return (
    <div>
      {/* Minimal Navbar with only Profile and Logout */}
      <Navbar minimal={true} />

      <h1 className="text-3xl font-bold mb-4">All Events</h1>

      {/* Added: Search Input */}
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full max-w-md"
      />

      {loading ? (
        <p>Loading events...</p>
      ) : filteredEvents.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <ul>
          {filteredEvents.map(event => (
            <li key={event._id}>{event.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}