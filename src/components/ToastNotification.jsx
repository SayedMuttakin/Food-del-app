import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaCheckCircle } from "react-icons/fa";

const ToastNotification = ({ show, message }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.3,
          }}
          className="fixed right-4 top-24 z-[9999]"
        >
          <div className="bg-white rounded-lg shadow-lg p-4 min-w-[300px] border-r-4 border-[#32a852] flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-opacity-10 rounded-full flex items-center justify-center">
              <FaShoppingCart className="text-[#32a852] text-xl" />
            </div>
            <div className="flex-grow">
              <h4 className="text-sm font-semibold text-gray-800">
                Added to Cart
              </h4>
              <p className="text-sm text-gray-600">{message}</p>
            </div>
            <div className="flex-shrink-0 self-start">
              <FaCheckCircle className="text-[#32a852] text-lg" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;
