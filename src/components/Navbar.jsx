import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LowerNavbar from "./LowerNavbar";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // লোগো ক্লিক করলে পেজের শীর্ষে স্ক্রল করা
  const handleLogoClick = () => {
    window.scrollTo(0, 0); // পেজের শীর্ষে স্ক্রল করে
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* 🔹 Upper Navbar */}
      <nav className="bg-[#6ff2af] shadow-md fixed w-full top-0 z-[1001]">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center w-[85%]">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-black"
            onClick={handleLogoClick} // লোগো ক্লিক ইভেন্ট যোগ করা হয়েছে
          >
            🍔 TastyBites
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {["Home", "Menu", "About", "Contact", "Reservation"].map(
              (item, index) => (
                <Link
                  key={index}
                  to={`/${item.toLowerCase()}`}
                  className="relative text-black hover:text-gray-700 transition 
                           after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] 
                           after:w-0 after:h-[3px] after:bg-gradient-to-r 
                           after:from-[rgb(111,242,175)] after:to-[#32a852] 
                           after:transition-all after:duration-300 
                           after:-translate-x-1/2 hover:after:w-full 
                           hover:after:from-[#ff7eb3] hover:after:to-[#ff758c]"
                  onClick={handleLinkClick}
                >
                  {item}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={handleDropdownToggle} className="text-black">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          ref={dropdownRef}
          className={`fixed pb-2.5 top-14 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 backdrop-blur-md shadow-md w-[85%] rounded-lg transition-all duration-300 z-[1001] ${
            isOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center">
            {["Home", "Menu", "About", "Contact", "Reservation"].map(
              (item, index) => (
                <Link
                  key={index}
                  to={`/${item.toLowerCase()}`}
                  className="block py-3 px-6 text-black hover:bg-[#6ff2af] w-full text-center rounded-md"
                  onClick={handleLinkClick}
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
      <LowerNavbar />
    </>
  );
};

export default Navbar;
