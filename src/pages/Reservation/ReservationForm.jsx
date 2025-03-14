import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReservation } from "../../redux/slices/reservationSlice";

const ReservationForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: 1,
    date: "",
    time: "",
  });

  const [isAvailable, setIsAvailable] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkAvailability = () => {
    const randomCheck = Math.random() > 0.3; // ৭০% সম্ভাবনা টেবিল খালি থাকবে
    setIsAvailable(randomCheck);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReservation(formData));
    setShowModal(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          min="1"
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        {/* 🔹 লাইভ অ্যাভেইলেবিলিটি চেক */}
        <button
          type="button"
          onClick={checkAvailability}
          className="w-full bg-gray-500 text-white py-2 rounded-lg"
        >
          Check Availability
        </button>
        {isAvailable !== null && (
          <p
            className={`text-center ${
              isAvailable ? "text-green-600" : "text-red-600"
            }`}
          >
            {isAvailable ? "✅ Table is Available!" : "❌ No Tables Available"}
          </p>
        )}

        {/* 🔹 সাবমিট বাটন */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Reserve Now
        </button>
      </form>

      {/* 🔹 কনফার্মেশন মডাল */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">✅ Reservation Confirmed!</h2>
            <p>
              Thank you, {formData.name}! Your table for {formData.guests}{" "}
              people is reserved.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;
