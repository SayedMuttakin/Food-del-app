import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUtensils,
  FaQuestionCircle,
  FaPhoneAlt,
} from "react-icons/fa";
import Footer from "../../components/Footer";
import ReservationForm from "./ReservationForm";

const Reservation = () => {
  // পেজ লোড হওয়ার সময় স্ক্রলটিকে শীর্ষে নিয়ে যাওয়া
  useEffect(() => {
    window.scrollTo(0, 0); // পেজের শীর্ষে স্ক্রল করে
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-38 pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto px-4 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Reserve Your Table
          </h1>
          <p className="text-gray-600 text-lg">
            Experience exceptional dining with perfect ambiance and service
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reservation Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaCalendarAlt className="text-green-600 text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Make a Reservation
                </h2>
                <p className="text-gray-600">Book your table in advance</p>
              </div>
            </div>
            <ReservationForm />
          </motion.div>

          {/* Information Section */}
          <div className="space-y-8">
            {/* Opening Hours */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUtensils className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Opening Hours
                  </h2>
                  <p className="text-gray-600">Plan your visit</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-semibold">11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Saturday - Sunday</span>
                  <span className="font-semibold">10:00 AM - 11:00 PM</span>
                </div>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaQuestionCircle className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">FAQ</h2>
                  <p className="text-gray-600">Common questions</p>
                </div>
              </div>
              <div className="space-y-4">
                <details className="border border-gray-200 rounded-lg">
                  <summary className="font-semibold cursor-pointer p-4 hover:bg-gray-50">
                    How far in advance should I book?
                  </summary>
                  <p className="p-4 pt-0 text-gray-600">
                    We recommend booking at least 24 hours in advance to ensure
                    availability. For special occasions and weekends, booking
                    3-4 days ahead is advised.
                  </p>
                </details>
                <details className="border border-gray-200 rounded-lg">
                  <summary className="font-semibold cursor-pointer p-4 hover:bg-gray-50">
                    What's your cancellation policy?
                  </summary>
                  <p className="p-4 pt-0 text-gray-600">
                    You can cancel your reservation up to 6 hours before your
                    scheduled time. Please inform us as early as possible if you
                    need to cancel.
                  </p>
                </details>
                <details className="border border-gray-200 rounded-lg">
                  <summary className="font-semibold cursor-pointer p-4 hover:bg-gray-50">
                    Can I make special requests?
                  </summary>
                  <p className="p-4 pt-0 text-gray-600">
                    Yes! You can add special requests during booking. We'll do
                    our best to accommodate dietary requirements and special
                    occasions.
                  </p>
                </details>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FaPhoneAlt className="text-red-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Need Help?
                  </h2>
                  <p className="text-gray-600">Contact us directly</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  For immediate assistance or special arrangements, please call
                  us:
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  +1 (555) 123-4567
                </p>
                <p className="text-gray-600">
                  Our team is available during business hours to help you with
                  your reservation needs.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reservation;
