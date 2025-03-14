import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // Redux Action
import { ArrowLeft } from "lucide-react";
import items from "../data/items";
import Footer from "../components/Footer";

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const item = items.find((product) => product.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  // পেজ লোড হওয়ার সময় স্ক্রলটিকে শীর্ষে নিয়ে যাওয়া
  useEffect(() => {
    window.scrollTo(0, 0); // পেজের শীর্ষে স্ক্রল করে
  }, []);

  if (!item) {
    return (
      <div className="text-center text-xl font-semibold mt-10">
        Item not found!
      </div>
    );
  }

  // 🔹 Add to Cart Function
  const handleAddToCart = () => {
    dispatch(addToCart({ ...item, quantity })); // Redux Store-এ পাঠানো
    alert(`${item.name} added to cart!`); // নোটিফিকেশন
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 md:p-6 mt-32 md:mt-24 bg-white shadow-lg rounded-lg relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/menu")}
          className="absolute top-4 left-1 md:top-8 md:left-4 flex items-center text-gray-700 hover:text-gray-900 transition"
        >
          <ArrowLeft size={26} className="mr-1" />
          <span className="text-sm md:text-base font-medium">Back</span>
        </button>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 items-center">
          {/* Product Image */}
          <div className="flex justify-center items-center bg-white p-4 md:p-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-full max-w-[320px] md:max-w-md h-auto object-contain rounded-lg shadow-md"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-start md:justify-center p-2 md:p-6 space-y-2 md:space-y-4">
            <h1 className="text-xl md:text-4xl font-bold text-gray-800">
              {item.name}
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              {item.description}
            </p>

            {/* Product Details (if available) */}
            {item.details?.length > 0 && (
              <ul className="list-disc list-inside text-sm md:text-base text-gray-700">
                {item.details.map((detail, index) => (
                  <li key={`${detail}-${index}`} className="mt-1">
                    {detail}
                  </li>
                ))}
              </ul>
            )}

            {/* Price */}
            <p className="text-xl md:text-3xl font-bold text-red-500">
              ${item.price ? Number(item.price).toFixed(2) : "0.00"}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-2 md:space-x-2">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-2 py-1 md:px-4 md:py-2 bg-gray-300 text-black text-xs md:text-base font-semibold rounded-md hover:bg-gray-400 transition-all duration-200"
              >
                -
              </button>
              <span className="text-sm md:text-lg font-bold min-w-[25px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-2 py-1 md:px-4 md:py-2 bg-gray-300 text-black text-xs md:text-base font-semibold rounded-md hover:bg-gray-400 transition-all duration-200"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-3 md:mt-5 px-4 md:px-6 py-2 md:py-3 text-white font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] cursor-pointer"
            >
              Add to Cart
            </button>

            {/* Go to Cart Button */}
            <button
              onClick={() => navigate("/cart")}
              className="mt-2 text-blue-600 font-semibold hover:underline"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailsPage;
