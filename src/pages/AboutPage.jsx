import React, { useEffect } from "react"; // useEffect হুক যোগ করা হয়েছে
import Footer from "../components/Footer";

const AboutPage = () => {
  // পেজ লোড হওয়ার সময় স্ক্রলটিকে শীর্ষে নিয়ে যাওয়া
  useEffect(() => {
    window.scrollTo(0, 0); // পেজের শীর্ষে স্ক্রল করে
  }, []);

  return (
    <>
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              About Us
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Delivering Deliciousness, One Meal at a Time
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-12">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                At TastyBites, our mission is simple: to bring joy to your table
                by delivering the best food from your favorite local
                restaurants. Whether you're craving comfort food, healthy
                options, or something exotic, we've got you covered. We believe
                that great food should be just a click away.
              </p>
            </div>
          </div>

          {/* Story Section */}
          <div className="mb-12">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                TastyBites started in 2020 with a simple idea: to make food
                delivery fast, reliable, and enjoyable. Over the years, we've
                grown into a trusted platform connecting thousands of customers
                with their favorite restaurants. Our journey has been fueled by
                a passion for great food and a commitment to excellent service.
              </p>
              <img
                src="/images/about-story.jpg" // আপনার public/image ফোল্ডারের ছবি
                alt="Our Story"
                className="mt-6 w-full h-92 object-fit rounded-lg"
              />
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="/images/team1.jpg" // আপনার public/image ফোল্ডারের ছবি
                  alt="Team Member 1"
                  className="w-full h-65 object-content"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                  <p className="text-gray-600">Co-Founder & CEO</p>
                  <p className="mt-4 text-gray-600">
                    John is passionate about food and technology. He leads the
                    team with a vision to revolutionize food delivery.
                  </p>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="/images/team2.jpg" // আপনার public/image ফোল্ডারের ছবি
                  alt="Team Member 2"
                  className="w-full h-65 object-content"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Jane Smith
                  </h3>
                  <p className="text-gray-600">Head of Operations</p>
                  <p className="mt-4 text-gray-600">
                    Jane ensures that every order is delivered on time and with
                    a smile. She loves solving logistics challenges.
                  </p>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src="/images/team3.jpg" // আপনার public/image ফোল্ডারের ছবি
                  alt="Team Member 3"
                  className="w-full h-65 object-content"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Mike Johnson
                  </h3>
                  <p className="text-gray-600">Lead Developer</p>
                  <p className="mt-4 text-gray-600">
                    Mike is the brains behind our app. He ensures that your
                    experience is seamless and enjoyable.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Our Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Fast Delivery
                </h3>
                <p className="text-gray-600">
                  We deliver your food hot and fresh, right to your doorstep, in
                  record time.
                </p>
              </div>

              {/* Service 2 */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Wide Variety
                </h3>
                <p className="text-gray-600">
                  Choose from hundreds of restaurants and cuisines to satisfy
                  your cravings.
                </p>
              </div>

              {/* Service 3 */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  24/7 Support
                </h3>
                <p className="text-gray-600">
                  Our customer support team is always here to help, day or
                  night.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-[#6ff2af] to-[#32a852] rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Order?
            </h2>
            <p className="text-white text-lg mb-6">
              Join thousands of happy customers and enjoy delicious meals today!
            </p>
            <button className="bg-white text-gray-900 font-semibold py-2 px-6 rounded-full hover:bg-[#ff7eb3] transition-colors">
              Order Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
