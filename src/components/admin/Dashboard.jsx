import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const API_URL = "http://localhost:5000/api";

// Format number with commas
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Dashboard = ({ stats }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [isLoadingSales, setIsLoadingSales] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Create an effect to show a quick "updating" indicator when stats change
  useEffect(() => {
    setIsUpdating(true);
    setLastUpdated(new Date());
    const timer = setTimeout(() => {
      setIsUpdating(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [stats]);

  // Fetch real weekly sales data
  useEffect(() => {
    const fetchWeeklySales = async () => {
      try {
        setIsLoadingSales(true);
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        const response = await axios.get(`${API_URL}/orders/weekly-sales`, {
          headers,
        });
        setSalesData(response.data);
      } catch (error) {
        console.error("Error fetching weekly sales:", error);
        // Use sample data as fallback
        setSalesData([
          { name: "Mon", sales: 4000 },
          { name: "Tue", sales: 3000 },
          { name: "Wed", sales: 5000 },
          { name: "Thu", sales: 2780 },
          { name: "Fri", sales: 1890 },
          { name: "Sat", sales: 2390 },
          { name: "Sun", sales: 3490 },
        ]);
      } finally {
        setIsLoadingSales(false);
      }
    };

    fetchWeeklySales();

    // Set up interval for real-time updates
    const salesInterval = setInterval(fetchWeeklySales, 15000); // Refresh every 15 seconds

    return () => clearInterval(salesInterval);
  }, []);

  // Fetch category distribution data
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setIsLoadingCategories(true);
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        const response = await axios.get(`${API_URL}/menu/category-stats`, {
          headers,
        });
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching category distribution:", error);
        // Use sample data as fallback
        setCategoryData([
          { name: "Pizza", value: 35 },
          { name: "Burger", value: 25 },
          { name: "Pasta", value: 20 },
          { name: "Drinks", value: 15 },
          { name: "Desserts", value: 5 },
        ]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategoryData();

    // Set up interval for real-time updates
    const categoryInterval = setInterval(fetchCategoryData, 20000); // Refresh every 20 seconds

    return () => clearInterval(categoryInterval);
  }, []);

  const COLORS = [
    "#32a852",
    "#2a8f45",
    "#1f6b33",
    "#154d25",
    "#0a2f17",
    "#083d1c",
    "#052712",
  ];

  return (
    <div className="space-y-8">
      {/* Real-time indicator */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
        <div className="flex items-center">
          <div
            className={`h-2 w-2 rounded-full mr-2 ${
              isUpdating ? "bg-green-500 animate-pulse" : "bg-gray-300"
            }`}
          ></div>
          <span className="text-sm text-gray-500">Real-time data</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
          <p className="text-3xl font-bold text-[#32a852]">
            {formatNumber(stats.totalOrders || 0)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-600">Total Revenue</h3>
          <p className="text-3xl font-bold text-[#32a852]">
            ${(stats.totalRevenue || 0).toFixed(2)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
          <p className="text-3xl font-bold text-[#32a852]">
            {formatNumber(stats.totalUsers || 0)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-600">Menu Items</h3>
          <p className="text-3xl font-bold text-[#32a852]">
            {formatNumber(stats.totalMenuItems || 0)}
          </p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Weekly Sales
            </h3>
            {isLoadingSales && (
              <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
            )}
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                <Legend />
                <Bar dataKey="sales" fill="#32a852" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Category Distribution
            </h3>
            {isLoadingCategories && (
              <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
            )}
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
