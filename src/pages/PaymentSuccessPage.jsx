import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle, FaHome, FaListAlt } from "react-icons/fa";
import { verifyPayment, verifyStripePayment } from "../api";
import { motion } from "framer-motion";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");
  const sessionId = queryParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const verifyOrder = async () => {
      if (!orderId) {
        setError("Order ID not found.");
        setLoading(false);
        return;
      }

      try {
        // Verify payment with backend
        let response;
        if (sessionId) {
          // Verify Stripe payment
          response = await verifyStripePayment({ sessionId, orderId });
        } else {
          // Verify SSLCommerz payment
          response = await verifyPayment({ orderId });
        }

        if (response.error) {
          setError(response.error);
        } else if (response.success && response.order) {
          setOrderDetails(response.order);
        } else {
          setError("There was an issue verifying your payment.");
        }
      } catch (err) {
        setError("Server error. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    verifyOrder();
  }, [orderId, sessionId]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8">
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Verifying payment...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                {error}
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Return to Checkout
              </button>
            </div>
          ) : (
            <>
              <div className="text-center">
                <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h2 className="mt-4 text-2xl font-bold text-gray-800">
                  Payment Successful!
                </h2>
                <p className="mt-2 text-gray-600">
                  Your order has been successfully placed.
                </p>
              </div>

              {orderDetails && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Order Details
                  </h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Order ID:</span>
                      <span className="text-gray-900 font-medium">
                        {orderDetails._id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Amount:</span>
                      <span className="text-gray-900 font-medium">
                        ${orderDetails.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Method:</span>
                      <span className="text-green-600 font-medium">
                        {orderDetails.paymentMethod === "stripe"
                          ? "Credit Card (Stripe)"
                          : orderDetails.paymentMethod === "sslcommerz"
                          ? "Online Payment"
                          : "Cash on Delivery"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => navigate("/")}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  <FaHome className="mr-2" /> Home
                </button>
                <button
                  onClick={() =>
                    navigate("/profile", { state: { showOrders: true } })
                  }
                  className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  <FaListAlt className="mr-2" /> My Orders
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
