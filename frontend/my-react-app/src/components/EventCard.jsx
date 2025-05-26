import React from 'react';
import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  return (
    <div className="border rounded shadow p-4 hover:shadow-lg transition cursor-pointer">
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-2">{event.location}</p>
      <p className="mb-2">{new Date(event.date).toLocaleDateString()}</p>
      <p className="mb-4">${event.price}</p>

      {/* ✅ Corrected Link syntax */}
      <Link
        to={`/events/${event._id}`}
        className="inline-block bg-indigo-600 text-white px-3 py-1 rounded"
      >
        View Details
      </Link>
    </div>
  );
} 