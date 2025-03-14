import React, { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ভ্যালিডেশন
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError("");

    // সিমুলেটেড API কল (3 সেকেন্ডের জন্য)
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="bg-gradient-to-r from-[#6ff2af] to-[#32a852] py-12 dark:from-[#1a2e3a] dark:to-[#0d1a23]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* হেডিং এবং সাবহেডিং */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 dark:text-gray-100">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-lg text-gray-100 mb-8 dark:text-gray-200">
          Get the latest updates, exclusive offers, and more delivered straight
          to your inbox.
        </p>

        {/* ইমেইল ফর্ম */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full md:w-96 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 ${
              error ? "border-2 border-red-500" : ""
            }`}
            disabled={isLoading || isSubscribed}
            required
          />
          <button
            type="submit"
            className={`w-full md:w-auto px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading || isSubscribed}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
              </div>
            ) : isSubscribed ? (
              "Subscribed!"
            ) : (
              "Subscribe"
            )}
          </button>
        </form>

        {/* এরর মেসেজ */}
        {error && (
          <p className="mt-4 text-red-500 dark:text-red-400">{error}</p>
        )}

        {/* সাকসেস মেসেজ */}
        {isSubscribed && (
          <p className="mt-4 text-green-200 dark:text-green-300">
            Thank you for subscribing! 🎉
          </p>
        )}

        {/* সোশ্যাল মিডিয়া লিঙ্কস */}
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-all duration-300 dark:text-gray-200 dark:hover:text-gray-300"
          >
            <i className="fab fa-facebook text-2xl"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-all duration-300 dark:text-gray-200 dark:hover:text-gray-300"
          >
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-all duration-300 dark:text-gray-200 dark:hover:text-gray-300"
          >
            <i className="fab fa-instagram text-2xl"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
