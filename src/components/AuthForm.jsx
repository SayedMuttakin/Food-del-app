import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:5000/api";

const AuthForm = ({ isLogin = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (isLogin) {
        // Login logic
        const response = await axios.post(`${API_URL}/auth/login`, {
          email: formData.email,
          password: formData.password,
        });

        // Store token
        localStorage.setItem("token", response.data.token);

        // Save user data in Redux store
        dispatch(setUser(response.data.user));

        // Show loading for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);

        // Set success message and navigate after delay
        setSuccessMessage("Login successful! Redirecting to home...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/home");
      } else {
        // Register logic
        const response = await axios.post(`${API_URL}/auth/register`, formData);

        // Show loading for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);

        // Set success message and navigate after delay
        setSuccessMessage("Registration successful! Redirecting to login...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/login");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err);
      setError(
        err.response?.data?.message ||
          (isLogin ? "Login failed" : "Registration failed")
      );
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-28"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative overflow-hidden"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <motion.p
                  className="text-green-600 font-medium text-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {isLogin ? "Logging in..." : "Creating account..."}
                </motion.p>
              </div>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              className="fixed top-4 right-4 bg-white text-green-600 p-6 rounded-lg shadow-2xl z-50 max-w-md border-l-4 border-green-500 flex items-center space-x-4"
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                },
              }}
              exit={{
                opacity: 0,
                x: 100,
                scale: 0.8,
                transition: {
                  duration: 0.3,
                },
              }}
            >
              <div className="bg-green-100 p-2 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  Success!
                </h3>
                <p className="text-gray-600 text-sm mt-1">{successMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.h1
          className="text-3xl font-bold text-center mb-8 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isLogin ? "Welcome Back!" : "Create Account"}
        </motion.h1>

        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-gray-700 mb-2" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all cursor-pointer"
                  required
                  disabled={loading}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-gray-700 mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all cursor-pointer"
                  required
                  disabled={loading}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-gray-700 mb-2" htmlFor="address">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all cursor-pointer"
                  required
                  disabled={loading}
                  rows="3"
                />
              </motion.div>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all cursor-pointer"
              required
              disabled={loading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all cursor-pointer"
              required
              disabled={loading}
              minLength="6"
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full text-white py-3 rounded-lg md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={loading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {isLogin ? "Login" : "Register"}
          </motion.button>
        </form>

        <motion.p
          className="mt-4 text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => navigate(isLogin ? "/register" : "/login")}
            className="text-[#32a852] hover:text-[#2a8f45] font-medium"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default AuthForm;
