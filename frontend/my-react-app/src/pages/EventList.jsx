import React, { useEffect, useState } from 'react';
import api from '../services/api';
import EventCard from '../components/EventCard';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [selectedLocation, setSelectedLocation] = useState('');

  // Fetch approved events on mount or when search changes
  useEffect(() => {
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      // Build query parameters for filters
      const queryParams = new URLSearchParams({ status: 'approved' });
      if (search.trim()) queryParams.append('search', search.trim());
      if (selectedLocation) queryParams.append('location', selectedLocation);

      // Make the API call with filters
      const res = await api.get(`/v1/events?${queryParams.toString()}`);

      setEvents(res.data);
    } catch (err) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, [search, selectedLocation]); 

  return (
  <div>
    {/* Add filter controls here */}
    <select
      value={selectedLocation}
      onChange={(e) => setSelectedLocation(e.target.value)}
      className="border p-2 mb-4"
    >
      <option value="">All Locations</option>
      <option value="Cairo">Cairo</option>
      <option value="Alexandria">Alexandria</option>
      {/* Add more locations */}
    </select>

    {/* Search input */}
    <input
      type="text"
      placeholder="Search events..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 mb-4"
    />

    {/* Loading, error, and event cards here */}
    {/* ...rest of your JSX */}
  </div>
);

}