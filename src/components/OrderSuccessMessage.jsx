import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaReceipt } from "react-icons/fa";

const OrderSuccessMessage = ({ show, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-green-500 to-green-600"></div>
              <div className="relative pt-16 px-6 pb-6">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg mb-6">
                  <FaCheckCircle className="text-5xl text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                  Order Confirmed!
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Your order has been received and is being processed.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center mb-2">
                    <FaReceipt className="text-gray-500 mr-2" />
                    <h3 className="font-medium text-gray-700">
                      Order Details:
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    • We'll prepare your food fresh just before delivery
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    • Estimated delivery time: 30-45 minutes
                  </p>
                  <p className="text-sm text-gray-600">
                    • You can track your order in the "My Orders" section
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderSuccessMessage;
