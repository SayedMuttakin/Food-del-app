import React, { useEffect } from "react"; // useEffect হুক যোগ করা হয়েছে
import Footer from "../../components/Footer";
import ReservationForm from "./ReservationForm";

const Reservation = () => {
  // পেজ লোড হওয়ার সময় স্ক্রলটিকে শীর্ষে নিয়ে যাওয়া
  useEffect(() => {
    window.scrollTo(0, 0); // পেজের শীর্ষে স্ক্রল করে
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-4 md:px-10 mt-35 md:mt-30">
        {/* 🔹 Booking Form */}
        <div className="flex justify-center mt-6">
          <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Table Reservation
            </h2>
            <ReservationForm />
          </div>
        </div>

        {/* 🔹 FAQ Section */}
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <details className="border p-3 rounded-lg">
              <summary className="font-semibold cursor-pointer">
                How far in advance should I book?
              </summary>
              <p className="mt-2 text-gray-600">
                It is recommended to book at least 24 hours in advance.
              </p>
            </details>
            <details className="border p-3 rounded-lg">
              <summary className="font-semibold cursor-pointer">
                Can I cancel my reservation?
              </summary>
              <p className="mt-2 text-gray-600">
                Yes, you can cancel your reservation, but please inform us at
                least 6 hours before.
              </p>
            </details>
            <details className="border p-3 rounded-lg">
              <summary className="font-semibold cursor-pointer">
                Can I make a group reservation?
              </summary>
              <p className="mt-2 text-gray-600">
                Yes, you can reserve a table for a group of 10-15 people.
              </p>
            </details>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reservation;
