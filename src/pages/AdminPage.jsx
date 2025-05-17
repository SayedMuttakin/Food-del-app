import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChartLine,
  FaBox,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserShield,
} from "react-icons/fa";
import Footer from "../components/Footer";
import Dashboard from "../components/admin/Dashboard";
import AddFood from "../components/admin/AddFood";
import ManageOrders from "../components/admin/ManageOrders";
import ManageMenu from "../components/admin/ManageMenu";
import ManageAdmins from "../components/admin/ManageAdmins";
import Sidebar from "../components/admin/Sidebar";

const API_URL = "http://localhost:5000/api";

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState(() => {
    // Initialize stats from sessionStorage if available
    const savedStats = sessionStorage.getItem("adminStats");
    return savedStats
      ? JSON.parse(savedStats)
      : {
          totalOrders: 0,
          totalRevenue: 0,
          totalUsers: 0,
          totalMenuItems: 0,
        };
  });

  useEffect(() => {
    checkAuth();
    fetchMenuItems();
    fetchStats();

    // Set up interval for real-time updates
    const statsInterval = setInterval(() => {
      fetchStats();
    }, 10000); // Refresh stats every 10 seconds

    // Clean up interval on component unmount
    return () => clearInterval(statsInterval);
  }, []);

  // Save stats to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem("adminStats", JSON.stringify(stats));
  }, [stats]);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Verify token is valid by making a request to the backend
      await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Authentication failed:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError("");
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axios.get(`${API_URL}/menu`, { headers });
      setMenuItems(response.data);
    } catch (error) {
      setError("Failed to fetch menu items. Please try again later.");
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      // Get current stats first to preserve values in case some API calls fail
      const currentStats = { ...stats };

      try {
        const ordersRes = await axios.get(`${API_URL}/orders/stats`, {
          headers,
        });
        if (ordersRes.data) {
          currentStats.totalOrders =
            ordersRes.data.totalOrders || currentStats.totalOrders;
          currentStats.totalRevenue =
            ordersRes.data.totalRevenue || currentStats.totalRevenue;
        }
      } catch (err) {
        console.error("Error fetching order stats:", err);
        // Keep current values for these stats
      }

      try {
        const usersRes = await axios.get(`${API_URL}/auth/stats`, { headers });
        if (usersRes.data) {
          currentStats.totalUsers =
            usersRes.data.totalUsers || currentStats.totalUsers;
        }
      } catch (err) {
        console.error("Error fetching user stats:", err);
        // Keep current value for totalUsers
      }

      try {
        const menuRes = await axios.get(`${API_URL}/menu/stats`, { headers });
        if (menuRes.data) {
          currentStats.totalMenuItems =
            menuRes.data.totalMenuItems || currentStats.totalMenuItems;
        }
      } catch (err) {
        console.error("Error fetching menu stats:", err);
        // If menu items API fails, use the length of the fetched menu items
        if (menuItems.length > 0) {
          currentStats.totalMenuItems = menuItems.length;
        }
      }

      // Update state with all available stats
      setStats(currentStats);

      console.log("Updated stats:", currentStats);
    } catch (error) {
      console.error("Error fetching stats:", error);

      // Set fallback values if fetch fails
      if (menuItems.length > 0) {
        setStats((prev) => ({
          ...prev,
          totalMenuItems: menuItems.length,
        }));
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard stats={stats} />;
      case "add-food":
        return <AddFood onFoodAdded={fetchMenuItems} />;
      case "manage-orders":
        return <ManageOrders onOrderStatusChange={fetchStats} />;
      case "manage-menu":
        return (
          <ManageMenu menuItems={menuItems} onMenuUpdate={fetchMenuItems} />
        );
      case "manage-admins":
        return <ManageAdmins />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block rounded-full h-16 w-16 border-4 border-[#32a852] border-t-transparent"
          />
          <p className="mt-6 text-xl font-semibold text-gray-700">
            Loading Dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md"
        >
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-red-500 text-xl font-semibold mb-4">{error}</p>
          <button
            onClick={fetchMenuItems}
            className="px-6 py-3 bg-[#32a852] text-white rounded-lg hover:bg-[#2a8f45] transition-colors duration-200 font-medium"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div
        className="lg:hidden fixed left-0 right-0 z-50 bg-white shadow-md p-4 flex items-center justify-between"
        style={{ top: "132px" }}
      >
        <h1 className="text-lg sm:text-xl font-bold text-gray-800 w-full text-center">
          Admin Panel
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#32a852]"
        >
          {isSidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Desktop Header */}
      <div
        className="hidden lg:flex w-full justify-center items-center bg-white shadow-md p-4"
        style={{ marginTop: "132px" }}
      >
        <h1 className="text-3xl font-extrabold text-gray-800 text-center w-full tracking-wide">
          Admin Panel
        </h1>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen pt-[190px] lg:pt-0">
        {" "}
        {/* 112px + 58px header approx */}
        {/* Sidebar - Mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-y-0 left-0 z-40 w-64 max-w-full lg:hidden"
              style={{ top: "190px" }}
            >
              <div className="h-[calc(100vh-190px)] bg-white shadow-lg overflow-y-auto">
                <Sidebar
                  activeTab={activeTab}
                  setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setIsSidebarOpen(false);
                  }}
                  onLogout={handleLogout}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-64 bg-white shadow-lg h-screen sticky top-0">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
          />
        </div>
        {/* Main Content */}
        <div className="flex-1 w-full">
          <div className="p-4 sm:p-6 md:p-8">{renderContent()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
