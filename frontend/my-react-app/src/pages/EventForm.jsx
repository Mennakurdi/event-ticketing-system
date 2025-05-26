import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function EventForm() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    date: '',
    location: '',
    price: 0,
    description: '',
    availableTickets: 0,
  });

  useEffect(() => {
    if (isEdit) {
      const fetchEvent = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await api.get(`/v1/events `, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setForm(res.data);
        } catch {
          toast.error('Failed to load event');
        }
      };
      fetchEvent();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (isEdit) {
        await api.put(`/v1/events/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Event updated!');
      } else {
        await api.post('/v1/events', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Event created!');
      }
      navigate('/my-events');
    } catch {
      toast.error('Failed to save event');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? '✏️ Edit Event' : '➕ Create Event'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2"
        />
        <input
          name="date"
          type="datetime-local"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2"
        />
        <input
          name="availableTickets"
          type="number"
          value={form.availableTickets}
          onChange={handleChange}
          placeholder="Available Tickets"
          className="w-full border p-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {isEdit ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}
