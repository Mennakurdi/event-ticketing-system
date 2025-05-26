 import axios from 'axios';

const api = axios.create({
baseURL: 'http://localhost:5179/api', // ✅ This MUST match your actual backend port! 
withCredentials: true, // needed for cookies if you use them

});

// Get current user's profile
export const getCurrentUser = () => api.get('/v1/users/profile');

// Update current user's profile
export const updateCurrentUser = (data) => api.put('/v1/users/profile', data);

export default api;