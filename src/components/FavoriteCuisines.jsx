import React from "react";
import { useNavigate } from "react-router-dom";

const FavoriteCuisines = () => {
  const navigate = useNavigate();
  const cuisines = [
    { name: "Pasta", type: "pasta", image: "/images/pasta.jpg" },
    { name: "Burger", type: "burger", image: "/images/burger1.png" },
    { name: "Soup", type: "soup", image: "/images/soup.png" },
    { name: "Chicken", type: "chicken", image: "/images/chicken.png" },
    { name: "Pizza", type: "pizza", image: "/images/pizza1.png" },
    { name: "Icecream", type: "dessert", image: "/images/icecream.jpg" },
    { name: "Kebab", type: "kebab", image: "/images/kebab.jpg" },
  ];

  // ক্লিক হ্যান্ডলার
  const handleCuisineClick = (cuisineType) => {
    navigate("/menu", { state: { cuisineType } });
  };

  return (
    <div className="bg-gray-50 py-12 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* হেডিং */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Favorite Cuisines
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Discover our signature flavors
          </p>
        </div>

        {/* গ্রিড লেআউট */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {cuisines.map((cuisine, index) => (
            <div
              key={index}
              onClick={() => handleCuisineClick(cuisine.type)}
              className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg transition-transform duration-300 hover:scale-105 transform text-center cursor-pointer"
            >
              {/* গোলাকার ইমেজ */}
              <div className="mb-2 mx-auto w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={cuisine.image}
                  alt={cuisine.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* টাইটেল */}
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-200">
                {cuisine.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteCuisines;
