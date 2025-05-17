import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api";

const ManageAdmins = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMakeAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/auth/make-admin`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message);
      setEmail("");
    } catch (error) {
      setError(error.response?.data?.message || "Error making user admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Admins</h2>

      <form onSubmit={handleMakeAdmin} className="max-w-md">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            User Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32a852]"
            placeholder="Enter user email"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full text-white py-2 px-4 rounded-lg md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] disabled:opacity-50"
        >
          {loading ? "Making Admin..." : "Make Admin"}
        </button>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg"
          >
            {message}
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg"
          >
            {error}
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default ManageAdmins;
