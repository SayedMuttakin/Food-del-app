import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUpload, FaSpinner } from "react-icons/fa";
import SuccessOverlay from "./SuccessOverlay";

const API_URL = "http://localhost:5000/api";

const AddFood = ({ onFoodAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${API_URL}/menu`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccess("Food item added successfully!");
      setShowSuccess(true);
      setFormData({
        name: "",
        details: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
      onFoodAdded();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add food item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Food Item
        </h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"
          >
            <p className="text-red-700">{error}</p>
          </motion.div>
        )}

        {success && (
          <SuccessOverlay
            show={showSuccess}
            message={success}
            onClose={() => setShowSuccess(false)}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#32a852] focus:border-transparent transition-colors cursor-pointer"
                placeholder="Enter food name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#32a852] focus:border-transparent transition-colors cursor-pointer"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Details
            </label>
            <input
              type="text"
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#32a852] focus:border-transparent transition-colors cursor-pointer"
              placeholder="Enter short details (e.g., Spicy, Vegetarian, etc.)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#32a852] focus:border-transparent transition-colors cursor-pointer"
              placeholder="Enter detailed description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#32a852] focus:border-transparent transition-colors cursor-pointer"
              >
                <option value="">Select a category</option>
                <option value="pasta">Pasta</option>
                <option value="burger">Burger</option>
                <option value="soup">Soup</option>
                <option value="chicken">Chicken</option>
                <option value="pizza">Pizza</option>
                <option value="icecream">Ice Cream</option>
                <option value="kebab">Kebab</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#32a852] focus:border-transparent transition-colors cursor-pointer"
                  placeholder="Enter image URL"
                />
                <FaUpload className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center space-x-2 px-6 py-3 text-white rounded-lg md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] ${
              loading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <span>Add Food Item</span>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddFood;
