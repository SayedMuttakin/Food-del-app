import { useState, useEffect } from "react"; // useEffect হুক যোগ করা হয়েছে
import { RadioGroup } from "@headlessui/react";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const paymentMethods = [
  { id: "creditCard", title: "Credit Card" },
  { id: "paypal", title: "PayPal" },
  { id: "cashOnDelivery", title: "Cash on Delivery" },
];

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart?.cart || []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: paymentMethods[0].id, // Default to Credit Card
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // পেজ লোড হওয়ার সময় স্ক্রলটিকে শীর্ষে নিয়ে যাওয়া
  useEffect(() => {
    window.scrollTo(0, 0); // পেজের শীর্ষে স্ক্রল করে
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal Code is required";
    if (formData.paymentMethod === "creditCard") {
      if (!formData.cardNumber)
        newErrors.cardNumber = "Card Number is required";
      if (!formData.expiryDate)
        newErrors.expiryDate = "Expiry Date is required";
      if (!formData.cvv) newErrors.cvv = "CVV is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Order placed successfully!");
        console.log("Form Data Submitted:", formData);
      }, 2000);
    }
  };

  // Calculate total price
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 mt-38 md:mt-32">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {/* Cart Summary Section */}
        <div className="mb-8 p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-3"
            >
              <div className="flex items-center gap-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded-md"
                />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-600">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t">
            <h3 className="text-lg font-bold">Total:</h3>
            <span className="text-lg font-bold">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* City Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          {/* Postal Code Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                errors.postalCode ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
            )}
          </div>

          {/* Payment Method Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <RadioGroup
              value={formData.paymentMethod}
              onChange={(value) =>
                setFormData({ ...formData, paymentMethod: value })
              }
              className="mt-1"
            >
              <RadioGroup.Label className="sr-only">
                Payment Method
              </RadioGroup.Label>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <RadioGroup.Option
                    key={method.id}
                    value={method.id}
                    className={({ checked }) =>
                      `${
                        checked
                          ? "bg-blue-50 border-blue-200"
                          : "bg-white border-gray-200"
                      } relative border rounded-md shadow-sm p-4 cursor-pointer`
                    }
                  >
                    {({ checked }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={`${
                              checked
                                ? "bg-blue-600 border-transparent"
                                : "bg-white border-gray-300"
                            } h-4 w-4 rounded-full border flex items-center justify-center`}
                          >
                            {checked && (
                              <span className="h-2 w-2 bg-white rounded-full" />
                            )}
                          </span>
                          <RadioGroup.Label className="ml-3 block text-sm font-medium text-gray-700">
                            {method.title}
                          </RadioGroup.Label>
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Credit Card Fields (Conditional Rendering) */}
          {formData.paymentMethod === "creditCard" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                    errors.cardNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                      errors.expiryDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                      errors.cvv ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-white font-semibold bg-gradient-to-r from-[#6ff2af] to-[#32a852] transition-all duration-300 hover:from-[#ff7eb3] hover:to-[#ff758c] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
