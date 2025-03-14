import React, { useState } from "react";
import johnDoe from "../assets/images/john-doe.jpg";
import janeSmith from "../assets/images/jane-smith.jpg";
import aliceJohnson from "../assets/images/alice-johnson.jpg";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Amazing food and great service! Highly recommended.",
    date: "2023-10-01",
    image: johnDoe, // লোকাল ছবি ফাইল
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    comment: "The ambiance was wonderful, and the dishes were delicious.",
    date: "2023-09-25",
    image: janeSmith, // লোকাল ছবি ফাইল
  },
  {
    id: 3,
    name: "Alice Johnson",
    rating: 3,
    comment: "Good experience, but the waiting time was a bit long.",
    date: "2023-09-20",
    image: aliceJohnson, // লোকাল ছবি ফাইল
  },
  // আরও রিভিউ যোগ করুন...
];

const CustomerReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  // বর্তমান পেজের রিভিউগুলি ক্যালকুলেট করা
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // প্যাগিনেশন বাটনগুলি তৈরি করা
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // প্যাগিনেশন "Previous" এবং "Next" বাটন
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(reviews.length / reviewsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-gray-50 py-12 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 dark:text-white">
          Customer Reviews
        </h2>

        {/* রিভিউ কার্ডগুলি */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800"
            >
              {/* কাস্টমারের ছবি */}
              <div className="flex items-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="text-gray-800 font-semibold dark:text-gray-100">
                    {review.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {review.date}
                  </p>
                </div>
              </div>

              {/* স্টার রেটিং */}
              <div className="flex items-center mb-4">
                <div className="text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* কমেন্ট */}
              <p className="text-gray-600 dark:text-gray-300">
                {review.comment}
              </p>
            </div>
          ))}
        </div>

        {/* প্যাগিনেশন */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="mx-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {[...Array(Math.ceil(reviews.length / reviewsPerPage))].map(
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            onClick={handleNext}
            disabled={
              currentPage === Math.ceil(reviews.length / reviewsPerPage)
            }
            className="mx-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
