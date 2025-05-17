import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import AuthForm from "./AuthForm";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const LowerNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.cart || []);
  const user = useSelector((state) => state.user?.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle search input change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setShowResults(false);
        setSearchResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    setShowResults(true);
    try {
      console.log("Searching for:", searchQuery.trim());
      const response = await axios.get(
        `http://localhost:5000/api/menu/search?query=${encodeURIComponent(
          searchQuery.trim()
        )}`
      );
      console.log("Search response:", response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching foods:", error);
      console.error("Error details:", error.response?.data || error.message);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle food item click
  const handleFoodClick = (food) => {
    navigate(`/details/${food._id}`, { state: { foodItem: food } });
    setSearchQuery("");
    setShowResults(false);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle Cart Page
  const toggleCartPage = () => {
    if (location.pathname === "/cart") {
      navigate(-1);
    } else {
      navigate("/cart");
    }
  };

  // Open the AuthForm page
  const handleLoginClick = () => {
    navigate("/login");
  };

  // Profile page navigate
  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="bg-white shadow-md w-full fixed top-19 md:top-[56px] z-[1000] py-3">
      <div className="container mx-auto px-6 flex items-center justify-center gap-6">
        {/* Search Input with Results */}
        <div className="flex-1 max-w-[400px] search-container relative">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Search food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#32a852] cursor-pointer"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 text-white text-sm md:text-base font-semibold rounded-r-lg bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] flex items-center gap-2 cursor-pointer"
            >
              <Search size={18} />
              <span className="hidden md:inline">Search</span>
            </button>
          </div>

          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
              {searchResults.map((food) => (
                <div
                  key={food._id}
                  onClick={() => handleFoodClick(food)}
                  className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                >
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">{food.name}</h4>
                    <p className="text-sm text-gray-600">${food.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#32a852]"></div>
              </div>
            </div>
          )}

          {/* No Results */}
          {showResults &&
            searchQuery &&
            !isLoading &&
            searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                <p className="text-gray-500 text-center">No foods found</p>
              </div>
            )}
        </div>

        {/* Login Button / Profile Button */}
        {user ? (
          <button
            onClick={handleProfileClick}
            className="px-6 py-3 rounded-lg text-white text-sm md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] cursor-pointer"
          >
            Profile
          </button>
        ) : (
          <button
            onClick={handleLoginClick}
            className="px-6 py-3 rounded-lg text-white text-sm md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] cursor-pointer"
          >
            Login
          </button>
        )}

        {/* Cart Icon with Count */}
        <button onClick={toggleCartPage} className="relative text-black">
          <motion.div
            key={cartItems?.length}
            animate={{
              scale: cartItems?.length ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 0.3,
              times: [0, 0.5, 1],
            }}
          >
            <ShoppingCart size={28} />
          </motion.div>
          <AnimatePresence>
            {cartItems?.length > 0 && (
              <motion.span
                key="cart-counter"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                  },
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  transition: {
                    duration: 0.2,
                  },
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg"
              >
                {cartItems.length}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
};

export default LowerNavbar;
