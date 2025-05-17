import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/cartSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Navigate to checkout page
  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 mt-28">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty. Add some items to continue.</p>
        <div className="mt-8"></div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-2 sm:px-4 py-8 mt-30">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        <div className="max-w-3xl mx-auto">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-2 sm:gap-4 mb-4 p-3 sm:p-4 border rounded bg-white shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded flex-shrink-0"
                onError={(e) => {
                  e.target.src = "/images/burger.png";
                  e.target.onerror = null;
                }}
              />
              <div className="flex-grow min-w-0">
                <h3 className="font-semibold text-sm sm:text-base truncate">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  ${item.price}
                </p>
                <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2">
                  <button
                    onClick={() => dispatch(decrementQuantity(item._id))}
                    className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-[#6ff2af] text-gray-800 text-sm sm:text-base rounded hover:bg-gradient-to-r hover:from-[#ff7eb3] hover:to-[#ff758c] hover:text-white transition-all duration-300"
                  >
                    -
                  </button>
                  <span className="w-6 sm:w-8 text-center text-sm sm:text-base">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item._id))}
                    className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-[#6ff2af] text-gray-800 text-sm sm:text-base rounded hover:bg-gradient-to-r hover:from-[#ff7eb3] hover:to-[#ff758c] hover:text-white transition-all duration-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 sm:gap-2 flex-shrink-0">
                <p className="font-semibold text-sm sm:text-base whitespace-nowrap">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="text-[#6ff2af] hover:text-[#ff7eb3] text-xs sm:text-sm transition-colors duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 border rounded bg-white shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Total Amount:</h3>
              <span className="text-xl font-bold">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[#6ff2af] text-gray-800 py-3 rounded-lg hover:bg-gradient-to-r hover:from-[#ff7eb3] hover:to-[#ff758c] hover:text-white transition-all duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
