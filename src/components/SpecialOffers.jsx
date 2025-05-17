import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaClock, FaPercent, FaArrowRight } from "react-icons/fa";

const SpecialOffers = () => {
  const navigate = useNavigate();
  // টাইমার স্টেট (24 ঘন্টা টাইমার)
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 ঘন্টা সেকেন্ডে

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // ক্লিনআপ
  }, []);

  // সেকেন্ডকে ঘন্টা, মিনিট, সেকেন্ডে কনভার্ট করুন
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const handleOrderNow = () => {
    navigate("/menu");
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-16 dark:bg-gray-950">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full bg-repeat"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E')",
          }}
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        {/* Content container */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left side: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 md:mb-0 md:mr-10 md:w-1/2 text-center md:text-left"
          >
            <div className="inline-block bg-gradient-to-r from-[#6ff2af] to-[#32a852] px-4 py-1 rounded-full mb-4">
              <span className="flex items-center text-white font-semibold text-sm">
                <FaPercent className="mr-2" /> Limited Time Offer
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Enjoy 20% Off{" "}
              <span className="text-[#6ff2af]">All Menu Items</span> Today!
            </h2>

            <p className="text-xl mb-8 text-gray-300 md:pr-10">
              Don't miss this exclusive offer on our delicious food. Order now
              and treat yourself to a taste sensation at an unbeatable price!
            </p>

            <motion.button
              onClick={handleOrderNow}
              className="px-8 py-4 text-white font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] rounded-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Order Now <FaArrowRight />
            </motion.button>
          </motion.div>

          {/* Right side: Timer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:w-1/2"
          >
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20">
              <div className="flex items-center gap-2 mb-4">
                <FaClock className="text-[#6ff2af] text-xl" />
                <h3 className="text-white text-xl font-semibold">
                  Offer Expires In:
                </h3>
              </div>

              <div className="flex justify-center gap-4">
                <motion.div
                  className="bg-gradient-to-br from-[#6ff2af]/80 to-[#32a852] p-6 rounded-xl shadow-lg text-center w-28"
                  whileHover={{ translateY: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-4xl font-bold text-white block">
                    {String(hours).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-white/80 uppercase tracking-wider mt-1 block">
                    Hours
                  </span>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-[#6ff2af]/80 to-[#32a852] p-6 rounded-xl shadow-lg text-center w-28"
                  whileHover={{ translateY: -5 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
                >
                  <span className="text-4xl font-bold text-white block">
                    {String(minutes).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-white/80 uppercase tracking-wider mt-1 block">
                    Minutes
                  </span>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-[#6ff2af]/80 to-[#32a852] p-6 rounded-xl shadow-lg text-center w-28"
                  whileHover={{ translateY: -5 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                >
                  <span className="text-4xl font-bold text-white block">
                    {String(seconds).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-white/80 uppercase tracking-wider mt-1 block">
                    Seconds
                  </span>
                </motion.div>
              </div>

              <div className="bg-white/10 p-4 rounded-lg mt-6 text-center">
                <p className="text-white text-sm">
                  Use code{" "}
                  <span className="font-bold bg-white/20 py-1 px-2 rounded ml-1">
                    TASTY20
                  </span>{" "}
                  at checkout
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SpecialOffers;
