import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaArrowUp,
  FaCreditCard,
  FaShieldAlt,
  FaTruck,
  FaHeadset,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  // Features section data
  const features = [
    { icon: <FaTruck />, title: "Free Delivery", desc: "Orders over $50" },
    {
      icon: <FaCreditCard />,
      title: "Secure Payment",
      desc: "100% secure payment",
    },
    {
      icon: <FaShieldAlt />,
      title: "Quality Guarantee",
      desc: "Fresh ingredients",
    },
    { icon: <FaHeadset />, title: "24/7 Support", desc: "Dedicated support" },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#2c3e50] to-[#1a252f] text-white w-full relative">
      {/* Wave SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden transform -translate-y-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-16"
        >
          <path
            fill="#2c3e50"
            fillOpacity="1"
            d="M0,96L48,117.3C96,139,192,181,288,181.3C384,181,480,139,576,133.3C672,128,768,160,864,176C960,192,1056,192,1152,181.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 pt-10 pb-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer"
              variants={itemVariants}
            >
              <div className="text-2xl mb-2 text-white">{feature.icon}</div>
              <h4 className="font-bold text-base">{feature.title}</h4>
              <p className="text-gray-300 text-xs">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 py-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* About Section */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-lg font-bold mb-3 border-b border-white/20 pb-2">
              About Us
            </h3>
            <p className="text-gray-300 mb-3 text-sm">
              We are dedicated to providing the best food delivery experience
              with fresh ingredients and timely service.
            </p>
            <div className="flex space-x-3">
              <motion.a
                href="#"
                className="bg-white/10 p-2 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
                variants={iconVariants}
                whileHover="hover"
              >
                <FaFacebook className="text-base" />
              </motion.a>
              <motion.a
                href="#"
                className="bg-white/10 p-2 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
                variants={iconVariants}
                whileHover="hover"
              >
                <FaTwitter className="text-base" />
              </motion.a>
              <motion.a
                href="#"
                className="bg-white/10 p-2 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
                variants={iconVariants}
                whileHover="hover"
              >
                <FaInstagram className="text-base" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-lg font-bold mb-3 border-b border-white/20 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-1">
              {["Home", "Menu", "About", "Contact", "Reservation"].map(
                (item, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group text-sm cursor-pointer"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">
                        •
                      </span>
                      {item}
                    </Link>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-lg font-bold mb-3 border-b border-white/20 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <motion.li
                className="flex items-start cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaMapMarkerAlt className="mt-1 mr-2 text-base" />
                <span className="text-gray-300 text-sm">
                  123 Delicious Street, Foodville
                </span>
              </motion.li>
              <motion.li
                className="flex items-center cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaPhone className="mr-2 text-base" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </motion.li>
              <motion.li
                className="flex items-center cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaEnvelope className="mr-2 text-base" />
                <span className="text-gray-300 text-sm">
                  contact@tastybites.com
                </span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-lg font-bold mb-3 border-b border-white/20 pb-2">
              Newsletter
            </h3>
            <p className="text-gray-300 mb-3 text-sm">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white text-sm cursor-pointer"
              />
              <motion.button
                className="px-3 py-1.5 bg-white text-[#2c3e50] rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright Section */}
        <div className="mt-4 pt-4 border-t border-white/20 text-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} TastyBites. All rights reserved.
          </p>
          <div className="flex justify-center mt-2 text-xs">
            <a
              href="#"
              className="mx-2 hover:underline text-gray-300 cursor-pointer"
            >
              Privacy Policy
            </a>
            <span className="text-gray-500">|</span>
            <a
              href="#"
              className="mx-2 hover:underline text-gray-300 cursor-pointer"
            >
              Terms of Service
            </a>
            <span className="text-gray-500">|</span>
            <a
              href="#"
              className="mx-2 hover:underline text-gray-300 cursor-pointer"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] text-white p-2.5 rounded-full shadow-lg z-50 cursor-pointer"
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FaArrowUp className="text-lg" />
      </motion.button>
    </footer>
  );
};

export default Footer;
