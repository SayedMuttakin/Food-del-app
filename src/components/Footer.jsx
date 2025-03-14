import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">TastyBites</h2>
            <p className="text-gray-400">
              Discover the best dishes and enjoy a delightful dining experience.
            </p>
          </div>

          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-white"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="text-gray-400 space-y-2">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-green-500" />
                123 Main Street, City, Country
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-green-500" />
                +123 456 7890
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-green-500" />
                info@restaurant.com
              </li>
            </ul>
          </div>

          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transform transition-transform duration-300 hover:scale-125"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-sky-400 transform transition-transform duration-300 hover:scale-125"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transform transition-transform duration-300 hover:scale-125"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Sayed. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
