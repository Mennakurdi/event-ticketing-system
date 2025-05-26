import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ Include useNavigate
import api from '../services/api';
import { toast } from 'react-toastify';

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Hook must be called inside the component
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get(`/v1/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(res.data);
      } catch (err) {
        toast.error('Failed to load booking details');
      } finally {
        setLoading(false);
      } 
    }; 

    fetchBooking();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!booking) return <p>Booking not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Booking Details</h1>

      <p><strong>Event:</strong> {booking.event?.title || 'N/A'}</p>
      <p><strong>Date:</strong> {booking.event?.date ? new Date(booking.event.date).toLocaleString() : 'N/A'}</p>
      <p><strong>Location:</strong> {booking.event?.location || 'N/A'}</p>
      <p><strong>Tickets:</strong> {booking.tickets}</p>
      <p><strong>Price per ticket:</strong> ${booking.event?.price || 0}</p>
      <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
      <p><strong>Status:</strong> {booking.status || "Confirmed"}</p>

      {/* ✅ Working Back Button */}
      <button
        onClick={() => navigate('/bookings')}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Back to My Bookings
      </button>
    </div>
  );
}
