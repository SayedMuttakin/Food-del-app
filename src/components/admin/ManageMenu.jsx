import React, { useState } from "react";
import axios from "axios";
import SuccessOverlay from "./SuccessOverlay";

const API_URL = "http://localhost:5000/api";

const ManageMenu = ({ menuItems, onMenuUpdate }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    description: "",
    price: "",
    category: "",
    image: "",
    isAvailable: true,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleEdit = (item) => {
    setEditingItem(item._id);
    setFormData({
      name: item.name,
      details: item.details,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      isAvailable: item.isAvailable,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/menu/${editingItem}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEditingItem(null);
      if (onMenuUpdate) {
        onMenuUpdate();
      }
      setSuccessMsg("Menu item updated successfully!");
      setShowSuccess(true);
    } catch (error) {
      console.error("Error updating menu item:", error);
      alert("Failed to update menu item. Please try again.");
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${API_URL}/menu/${itemId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (onMenuUpdate) {
          onMenuUpdate();
        }
        setSuccessMsg("Menu item deleted successfully!");
        setShowSuccess(true);
      } catch (error) {
        console.error("Error deleting menu item:", error);
        alert("Failed to delete menu item. Please try again.");
      }
    }
  };

  const handleToggleAvailability = async (itemId, currentStatus) => {
    try {
      await axios.put(
        `${API_URL}/menu/${itemId}`,
        { isAvailable: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (onMenuUpdate) {
        onMenuUpdate();
      }
    } catch (error) {
      console.error("Error toggling availability:", error);
      alert("Failed to update item availability. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <SuccessOverlay
        show={showSuccess}
        message={successMsg}
        onClose={() => setShowSuccess(false)}
      />
      <h2 className="text-2xl font-bold mb-6">Manage Menu Items</h2>
      {editingItem ? (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#32a852] focus:ring-[#32a852] cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Short Details
            </label>
            <input
              type="text"
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#32a852] focus:ring-[#32a852] cursor-pointer"
              placeholder="Enter short details (e.g., Spicy, Vegetarian, etc.)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#32a852] focus:ring-[#32a852] cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#32a852] focus:ring-[#32a852] cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#32a852] focus:ring-[#32a852] cursor-pointer"
            >
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
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#32a852] focus:ring-[#32a852] cursor-pointer"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="h-4 w-4 text-[#32a852] focus:ring-[#32a852] border-gray-300 rounded cursor-pointer"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Available
            </label>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#32a852] text-white py-2 px-4 rounded-md hover:bg-[#2a8f45] transition-colors cursor-pointer"
            >
              Update Item
            </button>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {menuItems.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.price?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() =>
                        handleToggleAvailability(item._id, item.isAvailable)
                      }
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.isAvailable
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.isAvailable ? "Available" : "Unavailable"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-white px-3 py-1 rounded-lg mr-3 md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-white px-3 py-1 rounded-lg md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMenu;
