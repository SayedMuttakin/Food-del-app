import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getOrderById } from "../api";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        if (data && !data.error) {
          setOrder(data);
          // Start countdown after order is loaded
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                navigate("/profile", { state: { showOrders: true } });
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          return () => clearInterval(timer);
        } else {
          setError(data?.error || "Failed to load order details");
          setTimeout(() => {
            navigate("/profile", { state: { showOrders: true } });
          }, 3000);
        }
      } catch (err) {
        setError("Failed to load order details");
        setTimeout(() => {
          navigate("/profile", { state: { showOrders: true } });
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center mt-28">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#32a852] border-t-transparent mx-auto"></div>
        <p className="mt-4">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center mt-28">
        <p className="text-red-500 mb-4">{error}</p>
        <p className="text-gray-600">
          Redirecting to profile page in {countdown} seconds...
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8 text-center mt-28">
        <p className="mb-4">Order not found</p>
        <p className="text-gray-600">
          Redirecting to profile page in {countdown} seconds...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-28">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-[#32a852] text-6xl" />
          </div>
          <h1 className="text-3xl font-bold text-[#32a852] mb-2">
            Order Successful!
          </h1>
          <p className="text-gray-600">Thank you for your order</p>
          <p className="text-gray-500 mt-2">
            Redirecting to profile page in {countdown} seconds...
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Order ID</p>
              <p className="font-semibold">{order._id}</p>
            </div>
            <div>
              <p className="text-gray-600">Order Status</p>
              <p className="font-semibold capitalize">{order.status}</p>
            </div>
            <div>
              <p className="text-gray-600">Payment Method</p>
              <p className="font-semibold capitalize">{order.paymentMethod}</p>
            </div>
            <div>
              <p className="text-gray-600">Total Amount</p>
              <p className="font-semibold">${(order.total || 0).toFixed(2)}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
          <div className="space-y-2">
            <p>{order.deliveryAddress?.street}</p>
            <p>
              {order.deliveryAddress?.city}, {order.deliveryAddress?.state}{" "}
              {order.deliveryAddress?.zipCode}
            </p>
            <p>Phone: {order.deliveryAddress?.phone}</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items?.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    e.target.src = "/images/burger.png";
                    e.target.onerror = null;
                  }}
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">
                    ${(item.price || 0).toFixed(2)} each
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
