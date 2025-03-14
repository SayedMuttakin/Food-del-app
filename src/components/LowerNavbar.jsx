import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import LoginModal from "./LoginModal";

const LowerNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart?.cart || []);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Toggle Cart Page
  const toggleCartPage = () => {
    if (location.pathname === "/cart") {
      navigate(-1);
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="bg-white shadow-md w-full fixed top-19 md:top-[56px] z-[1000] py-3">
      <div className="container mx-auto px-6 flex items-center justify-center gap-6 ">
        {/* 🟢 Search Input */}
        <div className="flex-1 max-w-[400px]">
          <input
            type="text"
            placeholder="Search food..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#32a852]"
          />
        </div>

        {/* 🟢 Login Button */}
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="px-6 py-3 rounded-lg text-white text-sm md:text-base font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c]"
        >
          Login
        </button>

        {/* 🟢 Cart Icon with Count */}
        <button onClick={toggleCartPage} className="relative text-black ">
          <ShoppingCart size={28} />
          {cartItems?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* 🟢 Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        closeModal={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default LowerNavbar;
