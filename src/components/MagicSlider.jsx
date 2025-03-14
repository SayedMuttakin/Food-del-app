import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "../assets/styles.css";
import { Link } from "react-router-dom"; // Link ইম্পোর্ট করুন
const images = [
  {
    src: "/images/food1.jpg",
    title: "DELICIOUS BURGERS",
    type: "TASTE THE BEST",
  },
  {
    src: "/images/food2.jpg",
    title: "FRESH PIZZAS",
    type: "HOT & CHEESY",
  },
  {
    src: "/images/food3.jpg",
    title: "HEALTHY SALADS",
    type: "FRESH & ORGANIC",
  },
  {
    src: "/images/food4.jpg",
    title: "EXOTIC DESSERTS",
    type: "SWEET & DELIGHTFUL",
  },
];

const MagicSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Image with Smooth Zoom Transition */}
      <CSSTransition
        in={true}
        key={`bg-${currentIndex}`}
        timeout={800}
        classNames="fade"
        unmountOnExit
      >
        <div className="absolute inset-0 w-full h-full transform-gpu">
          <img
            src={images[currentIndex].src}
            alt="slide"
            className="w-full h-full object-cover brightness-75 transition-all duration-1000 ease-in-out transform-gpu scale-105 hover:scale-100"
          />
        </div>
      </CSSTransition>

      {/* Text Content with Staggered Animation */}
      <CSSTransition
        in={true}
        key={`content-${currentIndex}`}
        timeout={800}
        classNames="slide"
        unmountOnExit
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-white w-[90%] md:w-[85%] max-w-4xl mx-auto text-center md:text-left z-20 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold opacity-0 animate-textSlide">
            {images[currentIndex].title}
          </h1>
          <h2 className="text-3xl md:text-5xl text-yellow-400 font-semibold opacity-0 animate-textSlide delay-100">
            {images[currentIndex].type}
          </h2>
          <p className="text-lg md:text-xl opacity-0 animate-textSlide delay-200">
            Enjoy the best flavors and fresh ingredients, made with love!
          </p>
          <Link to="/menu">
            <button className="mt-6 px-10 py-4 text-white font-semibold cursor-pointer bg-gradient-to-r from-[rgb(111,242,175)] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c]">
              ORDER NOW
            </button>
          </Link>
        </div>
      </CSSTransition>

      {/* Thumbnails Gallery */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {images.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-16 h-20 cursor-pointer transition-all duration-300 ${
              currentIndex === idx
                ? "border-4 border-white scale-110"
                : "opacity-60 hover:opacity-90"
            }`}
          >
            <img
              src={images[idx].src}
              alt="thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagicSlider;
