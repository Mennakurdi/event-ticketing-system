import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom'; // ✅ Import
import { toast } from 'react-toastify';

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); // ✅ must be inside component

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/v1/users/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch {
        toast.error('Failed to load bookings');
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/v1/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(prev => prev.filter(b => b._id !== id));
      toast.success('Booking canceled');
    } catch {
      toast.error('Failed to cancel booking');
    }
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map(b => (
            <li key={b._id} className="p-4 border rounded">
              <h2 className="text-xl font-semibold">{b.event?.title}</h2>
              <p>Quantity: {b.tickets}</p>
              <p>Total: ${b.totalPrice}</p>

              {/* ✅ Booking Details Button */}
              <button
                onClick={() => navigate(`/bookings/${b._id}`)}
                className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
              >
                Booking Details
              </button>

              {/* ✅ Cancel Booking Button */}
              <button
                onClick={() => handleCancel(b._id)}
                className="bg-red-600 text-white px-3 py-1 rounded mr-2"
              >
                Cancel Booking
              </button>

              {/* ✅ Back to Event Details Button */}
              {b.event?._id && (
                <button
                  onClick={() => navigate(`/events/${b.event._id}`)}
                  className="bg-gray-600 text-white px-3 py-1 rounded"
                >
                  Back to Event
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}