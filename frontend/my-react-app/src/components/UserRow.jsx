 import React from 'react';

export default function UserRow({ user, onUpdateRole, onDelete }) {
  return (
    <tr>
      <td className="border px-4 py-2">{user.name}</td>
      <td className="border px-4 py-2">{user.email}</td>
      <td className="border px-4 py-2">{user.role}</td>
      <td className="border px-4 py-2">
        <button 
          className="bg-yellow-400 px-2 py-1 rounded mr-2"
          onClick={() => onUpdateRole(user)}
        >
          Update Role
        </button>
        <button 
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => onDelete(user._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
