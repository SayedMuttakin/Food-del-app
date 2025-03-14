import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react"; // useEffect হুক যোগ করা হয়েছে
import Footer from "../components/Footer";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart?.cart || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // পেজ লোড হওয়ার সময় স্ক্রলটিকে শীর্ষে নিয়ে যাওয়া
  useEffect(() => {
    window.scrollTo(0, 0); // পেজের শীর্ষে স্ক্রল করে
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 mt-38 md:mt-28">
        <h1 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500">Your cart is empty.</p>
            <Link
              to="/menu"
              className="inline-block mt-2 text-blue-500 hover:text-blue-700 transition-colors text-sm md:text-base"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between border p-2 md:p-4 rounded-lg shadow-md gap-2"
              >
                {/* Left Section - Item Details */}
                <div className="flex items-center gap-2 flex-1 min-w-[150px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 md:w-16 md:h-16 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="truncate">
                    <h2 className="text-sm md:text-base font-semibold truncate">
                      {item.name}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600">
                      ${item.price}
                    </p>
                  </div>
                </div>

                {/* Middle Section - Quantity Controls */}
                <div className="flex items-center justify-center flex-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-xs md:text-sm"
                    >
                      -
                    </button>
                    <span className="min-w-[20px] text-center text-xs md:text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-xs md:text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Right Section - Remove Button */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 text-xs md:text-sm hover:underline whitespace-nowrap"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Total Price Section */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg md:text-xl font-bold">Total Amount:</h3>
                <span className="text-lg md:text-xl font-bold">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-2 md:py-3 text-white font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
