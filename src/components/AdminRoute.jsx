import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const AdminRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error("Admin verification failed:", error);
        localStorage.removeItem("token"); // Clear invalid token
      } finally {
        setIsLoading(false);
      }
    };

    verifyAdmin();
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#32a852] border-t-transparent"></div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
