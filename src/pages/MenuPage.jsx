import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import items from "../data/items";
import Footer from "../components/Footer";

const MenuPage = () => {
  const location = useLocation();
  const selectedCategory = location.state?.cuisineType; // ক্যাটাগরি টাইপ পাস করা হয়েছে
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState(null); // সক্রিয় আইটেম ট্র্যাক করার জন্য

  // পেজ লোড হওয়ার সময় স্ক্রলটিকে শীর্ষে নিয়ে যাওয়া
  useEffect(() => {
    window.scrollTo(0, 0); // পেজের শীর্ষে স্ক্রল করে
  }, [selectedCategory]); // ক্যাটাগরি পরিবর্তন হলে স্ক্রল করবে

  // ফিল্টার লজিক (ক্যাটাগরি + সার্চ)
  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory
      ? item.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="max-w-7xl mx-auto mt-35 p-5">
        {/* সার্চ বার */}
        <div className="mb-8 flex gap-4">
          <input
            type="text"
            placeholder="Search dishes..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32a852]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* ক্যাটাগরি হেডিং */}
        {selectedCategory && (
          <h2 className="text-3xl font-bold mb-6 text-center capitalize">
            {selectedCategory} Menu
          </h2>
        )}

        {/* আইটেম গ্রিড */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white shadow-2xl rounded-lg p-4 flex flex-col h-full transition-transform transform ${
                activeItem === item.id
                  ? "scale-105 shadow-3xl"
                  : "hover:scale-105 hover:shadow-3xl"
              }`}
              onMouseEnter={() => setActiveItem(item.id)} // ডেস্কটপে হোভার ইফেক্ট
              onMouseLeave={() => setActiveItem(null)} // ডেস্কটপে হোভার ইফেক্ট রিমুভ
              onClick={() => setActiveItem(item.id)} // মোবাইলে ট্যাপ ইফেক্ট
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain rounded-md"
              />
              <div className="mt-2 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-yellow-500 font-bold">⭐ {item.rating}</p>
                <p className="text-lg font-semibold text-green-600">
                  ${item.price}
                </p>
              </div>
              <Link
                to={`/details/${item.id}`}
                className="mt-3 text-center text-white font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] px-4 py-2 rounded-md"
              >
                Go to Details
              </Link>
            </div>
          ))}
        </div>

        {/* কোনো আইটেম না পাওয়া গেলে */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              {searchQuery
                ? `No items found for "${searchQuery}"`
                : "No items found in this category"}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                window.history.back();
              }}
              className="mt-4 px-6 py-2 bg-[#32a852] text-white rounded-lg hover:bg-[#2a8f45]"
            >
              Back to Menu
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MenuPage;
