 import React, { useEffect, useState } from 'react';
import api from '../services/api'; // ← this is your axios instance
import UserRow from '../components/UserRow';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);       // to hold fetched users
  const [loading, setLoading] = useState(true); // for loading state

  // Runs once when the page  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/v1/users'); // calls backend GET all users
        setUsers(res.data);                     // stores users in state
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false); // stops loading spinner
      }
    };   

    fetchUsers();
  }, []); // ← run only once on page mount
useEffect(() => {
  setUsers([
    { _id: "1", name: "Test Admin", email: "admin@test.com", role: "admin" },
    { _id: "2", name: "Jane Doe", email: "jane@example.com", role: "user" }
  ]);
}, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Registered Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <UserRow
                key={user._id}
                user={user}
                onUpdateRole={(user) => console.log("TODO: update role for", user)}
                onDelete={(userId) => console.log("TODO: delete user with ID", userId)}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  console.error
}
