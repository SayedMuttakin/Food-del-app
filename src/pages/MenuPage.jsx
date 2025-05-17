import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import axios from "axios";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import ToastNotification from "../components/ToastNotification";

const API_URL = "http://localhost:5000/api";

const categories = [
  { id: "all", name: "All Items", icon: "🍽️" },
  { id: "pasta", name: "Pasta", icon: "🍝" },
  { id: "burger", name: "Burger", icon: "🍔" },
  { id: "soup", name: "Soup", icon: "🥣" },
  { id: "chicken", name: "Chicken", icon: "🍗" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "icecream", name: "Ice Cream", icon: "🍨" },
  { id: "kebab", name: "Kebab", icon: "🥙" },
];

const MenuPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // If navigated from FavoriteCuisines
    if (location.state?.cuisineType) {
      setSelectedCategory(location.state.cuisineType);
    }
  }, [location.state]);

  useEffect(() => {
    fetchMenuItems();
    // eslint-disable-next-line
  }, [selectedCategory]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError("");
      let url = `${API_URL}/menu`;
      const params = [];
      if (selectedCategory !== "all")
        params.push(`category=${selectedCategory}`);
      if (params.length) url += `?${params.join("&")}`;

      console.log("Fetching menu from:", url);
      const res = await axios.get(url);
      console.log("API response:", res.data);

      if (res.data && res.data.items && Array.isArray(res.data.items)) {
        setMenuItems(res.data.items);
      } else if (Array.isArray(res.data)) {
        setMenuItems(res.data);
      } else {
        setMenuItems([]);
        console.error("Invalid data format received:", res.data);
      }
    } catch (err) {
      console.error("API error:", err);
      setError("Failed to fetch menu items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleItemClick = (item) => {
    navigate(`/details/${item._id}`, { state: { foodItem: item } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6ff2af]"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button
          onClick={fetchMenuItems}
          className="px-6 py-2 bg-[#6ff2af] text-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-[#ff7eb3] hover:to-[#ff758c] hover:text-white transition-all duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 mt-32 md:mt-28">
          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
                  selectedCategory === cat.id
                    ? "text-white font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-[#6ff2af] hover:to-[#32a852] hover:text-white"
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
          {/* Menu Items Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {menuItems.length > 0 ? (
                menuItems.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "/images/burger.png";
                          e.target.onerror = null;
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-[#6ff2af] text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold group-hover:text-[#6ff2af] transition-colors duration-300">
                          {item.name}
                        </h3>
                        <span className="text-sm text-gray-500 capitalize bg-gray-100 px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {item.details}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        className="w-full bg-[#6ff2af] text-gray-800 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-[#ff7eb3] hover:to-[#ff758c] hover:text-white transition-all duration-300 font-medium flex items-center justify-center gap-2"
                      >
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-white rounded-2xl shadow-md col-span-full"
                >
                  <div className="text-7xl mb-4">😕</div>
                  <p className="text-xl text-gray-500 mb-4">
                    No items found in this category
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        <Footer />
      </div>
      <ToastNotification
        show={showToast}
        message="Your item has been added to the cart"
      />
    </>
  );
};

export default MenuPage;
