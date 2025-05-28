 import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load current user on first mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/v1/users/profile", {
          withCredentials: true
        });
        setUser(res.data);
        console.log("✅ User loaded from profile:", res.data);
      } catch (err) {
        console.warn("⚠️ No active session or profile load failed");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const res = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data?.message || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Unknown error"
      };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await api.get("/auth/logout", { withCredentials: true });
    } catch (err) {
      console.warn("⚠️ Logout may not have cleared cookie");
    }
    setUser(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
} 