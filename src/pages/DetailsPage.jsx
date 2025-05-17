import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import ToastNotification from "../components/ToastNotification";

const API_URL = "http://localhost:5000/api";

const DetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [item, setItem] = useState(location.state?.foodItem || null);
  const [loading, setLoading] = useState(!location.state?.foodItem);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLocalItem, setIsLocalItem] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // পেজ লোড হওয়ার সময় স্ক্রলটিকে শীর্ষে নিয়ে যাওয়া
  useEffect(() => {
    window.scrollTo(0, 0);

    if (item) {
      setIsLocalItem(!item._id); // _id না থাকলে লোকাল আইটেম
      return;
    }

    const fetchItemDetails = async () => {
      try {
        // প্রথমে API থেকে চেষ্টা করুন
        const response = await axios.get(`${API_URL}/foods/${id}`);
        setItem(response.data);
        setIsLocalItem(false);
      } catch (apiError) {
        console.log("API fetch failed, trying local storage...");

        // API ফেইল করলে LocalStorage চেক করুন
        const localItems = JSON.parse(localStorage.getItem("foods")) || [];
        const foundItem = localItems.find((i) => i.id === parseInt(id));

        if (foundItem) {
          setItem(foundItem);
          setIsLocalItem(true);
        } else {
          setError("Item not found");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id, location.state, item]);

  // Add to Cart Function
  const handleAddToCart = () => {
    if (!item) return;

    dispatch(
      addToCart({
        ...item,
        quantity,
      })
    );

    // Show toast notification
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block rounded-full h-12 w-12 border-t-2 border-b-2 border-[#32a852]"
        />
        <p className="mt-4 text-lg">Loading item details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center py-20">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => navigate("/menu")}
          className="mt-4 px-6 py-2 text-white rounded-lg md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c]"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center py-20">
        <p className="text-lg text-gray-500">Food item not found</p>
        <button
          onClick={() => navigate("/menu")}
          className="mt-4 px-6 py-2 text-white rounded-lg md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c]"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 md:p-6 mt-32 md:mt-24 bg-white shadow-lg rounded-lg relative">
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate("/menu")}
          className="absolute top-4 left-1 md:top-8 md:left-4 flex items-center text-gray-700 hover:text-gray-900 transition"
        >
          <ArrowLeft size={26} className="mr-1" />
          <span className="text-sm md:text-base font-medium">Back</span>
        </motion.button>

        {/* Source Indicator */}
        {isLocalItem && (
          <div className="absolute top-4 right-4 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            Local Item
          </div>
        )}

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center bg-white p-4 md:p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full max-w-[320px] md:max-w-md h-auto object-contain rounded-lg shadow-md"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-start md:justify-center p-2 md:p-6 space-y-2 md:space-y-4"
          >
            <h1 className="text-xl md:text-4xl font-bold text-gray-800">
              {item.name}
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              {item.description}
            </p>

            {/* Rating and Category */}
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{item.rating}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{item.category}</span>
            </div>

            {/* Short Details */}
            <div className="mt-2">
              <h3 className="text-lg font-semibold">Quick Info:</h3>
              <p className="text-sm md:text-base text-gray-700">
                {item.details}
              </p>
            </div>

            {/* Price */}
            <p className="text-xl md:text-3xl font-bold text-red-500">
              ${item.price ? Number(item.price).toFixed(2) : "0.00"}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-2 md:space-x-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-2 py-1 md:px-4 md:py-2 bg-gray-300 text-black text-xs md:text-base font-semibold rounded-md hover:bg-gray-400 transition-all duration-200 cursor-pointer"
              >
                -
              </motion.button>
              <span className="text-sm md:text-lg font-bold min-w-[25px] text-center">
                {quantity}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-2 py-1 md:px-4 md:py-2 bg-gray-300 text-black text-xs md:text-base font-semibold rounded-md hover:bg-gray-400 transition-all duration-200 cursor-pointer"
              >
                +
              </motion.button>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="mt-3 md:mt-5 px-4 md:px-6 py-2 md:py-3 text-white font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] cursor-pointer"
            >
              Add to Cart
            </motion.button>

            {/* Go to Cart Button */}
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => navigate("/cart")}
              className="mt-2 text-blue-600 font-semibold hover:underline self-start cursor-pointer"
            >
              Go to Cart →
            </motion.button>
          </motion.div>
        </div>
      </div>
      <Footer />
      <ToastNotification
        show={showToast}
        message="Your item has been added to the cart"
      />
    </>
  );
};

export default DetailsPage;
