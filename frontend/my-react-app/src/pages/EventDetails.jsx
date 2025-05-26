 import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/v1/events/${id}`);

        setEvent(res.data);
      } catch (err) {
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)} className="mb-4 underline text-indigo-600">Back</button>
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Price:</strong> ${event.price}</p>
      <p><strong>Available Tickets:</strong> {event.availableTickets}</p>
      {/* Add Booking form here later */}
    </div>
  );
}