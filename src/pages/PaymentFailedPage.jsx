import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle, FaArrowLeft, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";

const PaymentFailedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center">
            <FaTimesCircle className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              Payment Failed
            </h2>
            <p className="mt-2 text-gray-600">
              There was an issue processing your payment. Please try again.
            </p>
          </div>

          <div className="mt-8 bg-red-50 rounded-lg p-4 border border-red-100">
            <h3 className="text-lg font-medium text-red-800">
              Possible Reasons:
            </h3>
            <ul className="mt-2 text-sm text-red-700 space-y-1 list-disc list-inside">
              <li>Insufficient funds in your card</li>
              <li>Payment method not selected correctly</li>
              <li>Transaction declined by your bank</li>
              <li>Network connection issues</li>
            </ul>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => navigate("/checkout")}
              className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Return to Checkout
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <FaCreditCard className="mr-2" /> Try Again
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailedPage;
