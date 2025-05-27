import React, { useState } from 'react';
import api from '../services/api';

export default function UpdateUserRoleModal({ user, onClose, onRoleUpdated }) {
  const [newRole, setNewRole] = useState(user.role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await api.put(`/v1/users/${user._id}`, { role: newRole });
      onRoleUpdated(user._id, newRole); // notify parent
      onClose(); // close modal
    } catch (err) {
      setError('Failed to update role');
    } finally {
      setLoading(false);
    }
  };
vi
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[300px]">
        <h3 className="text-lg font-bold mb-4">Update Role</h3>

        <select
          className="w-full border px-2 py-1 mb-4"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="organizer">Organizer</option>
          <option value="admin">Admin</option>
        </select>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border">Cancel</button>
          <button
            onClick={handleUpdate}
            className="px-3 py-1 bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}
