import React, { useState, useEffect } from "react";

const SpecialOffers = () => {
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

  return (
    <div className="bg-gray-50 py-12 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* হেডিং */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          Special Offer!
        </h2>

        {/* অফারের বিবরণ */}
        <p className="text-xl mb-6 text-gray-600 dark:text-gray-300">
          Order today and get{" "}
          <span className="font-bold text-[#32a852] dark:text-[#6ff2af]">
            20% discount
          </span>
          !
        </p>

        {/* টাইমার */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          <div className="bg-red-500 p-4 rounded-lg shadow-md">
            <span className="text-2xl font-bold text-white">
              {String(hours).padStart(2, "0")}
            </span>
            <span className="text-sm text-white block">Hours</span>
          </div>
          <div className="bg-red-500 p-4 rounded-lg shadow-md">
            <span className="text-2xl font-bold text-white">
              {String(minutes).padStart(2, "0")}
            </span>
            <span className="text-sm text-white block">Minutes</span>
          </div>
          <div className="bg-red-500 p-4 rounded-lg shadow-md">
            <span className="text-2xl font-bold text-white">
              {String(seconds).padStart(2, "0")}
            </span>
            <span className="text-sm text-white block">Seconds</span>
          </div>
        </div>

        {/* কল টু অ্যাকশন (CTA) বাটন */}
        <button className="px-8 py-3 text-white font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] rounded-md cursor-pointer dark:from-[#5ae0a1] dark:to-[#2c8a46] dark:hover:from-[#ff678a] dark:hover:to-[#ff4a6d]">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default SpecialOffers;
