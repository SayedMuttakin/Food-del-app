import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setUser, logoutUser } from "../redux/userSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaEdit,
  FaHistory,
  FaClock,
  FaTrash,
  FaExclamationTriangle,
} from "react-icons/fa";
import axios from "axios";
import { getMyOrders, deleteOrder } from "../api";
import Footer from "../components/Footer";

const API_URL = "http://localhost:5000/api";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders"); // Default to orders tab
  const [deletingOrderId, setDeletingOrderId] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("Fetching orders...");
      const data = await getMyOrders();
      console.log("Received orders:", data);
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("Received invalid orders data:", data);
        setError("Failed to load orders: Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Move fetchOrders above the useEffects
  useEffect(() => {
    if (location.state?.showOrders) {
      console.log("Location state triggered order fetch");
      fetchOrders();
      // Clear the state after fetching
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    console.log("User triggered order fetch:", user);
    // Fetch orders when component mounts or user changes
    fetchOrders();
  }, [user, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setUser(response.data));
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchProfile();
  }, [dispatch, navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleEdit = () => {
    setEditedUser({
      fullName: user?.fullName || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/auth/profile`, editedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update user in Redux store
      dispatch(setUser(response.data.user));
      setSuccess("Profile updated successfully!");
      setIsEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      setDeletingOrderId(orderId);
      setError("");

      const response = await deleteOrder(orderId);

      if (response.error) {
        setError(response.error || "Failed to delete order");
        return;
      }

      // Remove the deleted order from the list
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
      setSuccess("Order deleted successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting order:", error);
      setError(error.message || "Failed to delete order");
    } finally {
      setDeletingOrderId(null);
      setShowConfirmDialog(false);
    }
  };

  const confirmDeleteOrder = (order) => {
    setOrderToDelete(order);
    setShowConfirmDialog(true);
  };

  const cancelDelete = () => {
    setOrderToDelete(null);
    setShowConfirmDialog(false);
  };

  if (!user) {
    return (
      <motion.div
        className="container mx-auto px-4 py-8 mt-32"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Please login to view your profile
          </h1>
          <motion.button
            onClick={() => navigate("/login")}
            className="text-white px-6 py-2 rounded-lg md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl p-5 md:p-6 max-w-md w-full mx-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-red-500 mb-4">
                <FaExclamationTriangle className="text-xl md:text-2xl" />
                <h3 className="text-lg md:text-xl font-bold">
                  Confirm Deletion
                </h3>
              </div>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                Are you sure you want to delete Order #
                {orderToDelete?._id.slice(-6)}? This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <motion.button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-white rounded-lg md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] w-full sm:w-auto mb-2 sm:mb-0"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={() => handleDeleteOrder(orderToDelete._id)}
                  className="px-4 py-2 text-white rounded-lg md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] w-full sm:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={deletingOrderId === orderToDelete?._id}
                >
                  {deletingOrderId === orderToDelete?._id ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Deleting...</span>
                    </div>
                  ) : (
                    "Delete Order"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-12 mt-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                My Profile
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Manage your account and view order history
              </p>
            </div>
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <motion.button
                onClick={handleEdit}
                className="text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] flex items-center gap-2 shadow-sm flex-1 md:flex-none justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isEditing}
              >
                <FaEdit /> Edit Profile
              </motion.button>
              <motion.button
                onClick={handleLogout}
                className="text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] flex items-center gap-2 shadow-sm flex-1 md:flex-none justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaSignOutAlt /> Logout
              </motion.button>
            </div>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200 shadow-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 border border-green-200 shadow-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Profile Information */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 md:mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaUser className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Personal Info
                  </h2>
                  <p className="text-gray-500 text-sm md:text-base">
                    Update your information
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3 rounded-full">
                      <FaUser className="text-green-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedUser.fullName}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              fullName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          disabled={loading}
                        />
                      ) : (
                        <p className="text-lg text-gray-800 font-medium">
                          {user.fullName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3 rounded-full">
                      <FaEnvelope className="text-green-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                      </label>
                      <p className="text-lg text-gray-800 font-medium">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3 rounded-full">
                      <FaPhone className="text-green-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedUser.phone}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          disabled={loading}
                        />
                      ) : (
                        <p className="text-lg text-gray-800 font-medium">
                          {user.phone || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-50 p-3 rounded-full">
                      <FaMapMarkerAlt className="text-green-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Address
                      </label>
                      {isEditing ? (
                        <textarea
                          value={editedUser.address}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              address: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          rows="3"
                          disabled={loading}
                        />
                      ) : (
                        <p className="text-lg text-gray-800 font-medium">
                          {user.address || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-4 mt-8">
                    <motion.button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2.5 text-white md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      onClick={handleSave}
                      className="text-white px-6 py-2.5 rounded-lg md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] flex items-center gap-2 shadow-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Order History */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 md:mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaHistory className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Order History
                  </h2>
                  <p className="text-gray-500 text-sm md:text-base">
                    View your past orders and their status
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#32a852] border-t-transparent"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500 text-lg">{error}</p>
                  <button
                    onClick={fetchOrders}
                    className="mt-4 text-white px-4 py-2 rounded-lg md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c]"
                  >
                    Try Again
                  </button>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <FaHistory className="text-gray-400 text-5xl mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No orders yet</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-white"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-lg text-gray-800">
                              Order #{order._id.slice(-6)}
                            </p>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <FaClock className="text-sm" />
                            <p className="text-sm">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                        </div>
                        {order.status === "cancelled" && (
                          <motion.button
                            onClick={() => confirmDeleteOrder(order)}
                            className="text-white px-4 py-2 rounded-lg md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="Delete this order"
                          >
                            <FaTrash /> Delete
                          </motion.button>
                        )}
                      </div>

                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg shadow-sm"
                              onError={(e) => {
                                e.target.src = "/images/burger.png";
                                e.target.onerror = null;
                              }}
                            />
                            <div className="flex-grow mt-2 sm:mt-0">
                              <p className="font-medium text-lg text-gray-800">
                                {item.name}
                              </p>
                              <p className="text-gray-500">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <p className="font-semibold text-lg text-gray-800 mt-2 sm:mt-0">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start pt-4 border-t border-gray-100 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Delivery Address:
                          </p>
                          <p className="text-gray-800">
                            {order.deliveryAddress.street},{" "}
                            {order.deliveryAddress.city}
                          </p>
                        </div>
                        <div className="text-left sm:text-right mt-2 sm:mt-0">
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Total Amount:
                          </p>
                          <p className="font-bold text-2xl text-[#32a852]">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
