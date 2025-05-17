import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createOrder,
  initiatePayment,
  createStripeCheckoutSession,
} from "../api";
import { clearCart } from "../redux/cartSlice";
import OrderSuccessMessage from "../components/OrderSuccessMessage";
import {
  FaShoppingBag,
  FaTruck,
  FaCreditCard,
  FaMoneyBillWave,
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user?.user);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Delivery fee and tax calculation
  const deliveryFee = 2.99;
  const tax = total * 0.05; // 5% tax
  const grandTotal = total + deliveryFee + tax;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Delivery Info, Step 2: Payment
  const [redirectToPaymentGateway, setRedirectToPaymentGateway] =
    useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: user?.fullName || "",
    email: user?.email || "",
    street: user?.address || "",
    city: "",
    state: "",
    zipCode: "",
    phone: user?.phone || "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (step === 1) {
      // Validate delivery info
      if (
        !deliveryInfo.name ||
        !deliveryInfo.street ||
        !deliveryInfo.city ||
        !deliveryInfo.state ||
        !deliveryInfo.zipCode ||
        !deliveryInfo.phone
      ) {
        setError("Please fill in all required fields");
        return;
      }
      setError("");
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form fields
      if (
        !deliveryInfo.name ||
        !deliveryInfo.street ||
        !deliveryInfo.city ||
        !deliveryInfo.state ||
        !deliveryInfo.zipCode ||
        !deliveryInfo.phone
      ) {
        setError("Please fill in all required delivery information");
        setLoading(false);
        return;
      }

      // Validate cart items have all required fields for Stripe
      if (paymentMethod === "stripe") {
        const invalidItems = cartItems.filter(
          (item) => !item.name || typeof item.price !== "number" || !item._id
        );

        if (invalidItems.length > 0) {
          console.error("Invalid cart items for Stripe payment:", invalidItems);
          setError(
            "Some items in your cart have invalid data. Please try refreshing the page or contact support."
          );
          setLoading(false);
          return;
        }
      }

      // Prepare order data
      const orderData = {
        items: cartItems.map((item) => ({
          menuItem: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total: grandTotal,
        paymentMethod: paymentMethod,
        deliveryAddress: {
          street: deliveryInfo.street,
          city: deliveryInfo.city,
          state: deliveryInfo.state,
          zipCode: deliveryInfo.zipCode,
        },
        specialInstructions: specialInstructions || "",
      };

      if (paymentMethod === "cash") {
        // Create order with cash on delivery
        console.log("Creating cash order with data:", orderData);
        const response = await createOrder(orderData);

        if (response.error || response.message) {
          console.error("Order creation error:", response);
          setError(
            response.error || response.message || "Failed to create order"
          );
          return;
        }

        if (response._id) {
          // Clear cart
          dispatch(clearCart());
          // Show success message
          setShowSuccess(true);
        } else {
          setError("Failed to create order. Please try again.");
        }
      } else if (paymentMethod === "stripe") {
        // Create order first
        console.log("Creating order for Stripe payment:", orderData);
        const orderResponse = await createOrder(orderData);

        if (orderResponse.error || orderResponse.message) {
          console.error(
            "Order creation error for Stripe payment:",
            orderResponse
          );
          setError(
            orderResponse.error ||
              orderResponse.message ||
              "Failed to create order"
          );
          return;
        }

        if (!orderResponse._id) {
          setError(
            "Order was created but no order ID was returned. Please try again."
          );
          return;
        }

        try {
          // Initiate Stripe payment
          console.log("Order created successfully, initiating Stripe payment");
          const paymentData = {
            orderId: orderResponse._id,
            amount: grandTotal,
            customerInfo: {
              name: deliveryInfo.name,
              email: deliveryInfo.email,
              address: deliveryInfo.street,
              city: deliveryInfo.city,
              state: deliveryInfo.state,
              zipCode: deliveryInfo.zipCode,
              phone: deliveryInfo.phone,
            },
          };

          console.log("Stripe payment data:", paymentData);
          const stripeResponse = await createStripeCheckoutSession(paymentData);

          if (stripeResponse.error) {
            console.error("Stripe checkout error:", stripeResponse);
            setError(
              stripeResponse.error || "Failed to initialize Stripe payment"
            );
            return;
          }

          if (stripeResponse.url) {
            // Redirect to Stripe checkout
            console.log("Redirecting to Stripe checkout:", stripeResponse.url);

            // Clear cart before redirecting
            dispatch(clearCart());

            // Redirect to Stripe
            window.location.href = stripeResponse.url;
          } else {
            setError("Failed to get Stripe checkout URL. Please try again.");
          }
        } catch (stripeError) {
          console.error("Stripe checkout error:", stripeError);
          setError(
            "Payment processing error: " +
              (stripeError.message || "Unknown error")
          );
        }
      } else if (paymentMethod === "card") {
        // Create order first
        console.log("Creating order for SSLCommerz payment:", orderData);
        const orderResponse = await createOrder(orderData);

        if (orderResponse.error || orderResponse.message) {
          console.error(
            "Order creation error for SSLCommerz payment:",
            orderResponse
          );
          setError(
            orderResponse.error ||
              orderResponse.message ||
              "Failed to create order"
          );
          return;
        }

        if (orderResponse._id) {
          // Initiate SSLCommerz payment
          console.log(
            "Order created successfully, initiating SSLCommerz payment"
          );
          const paymentData = {
            orderId: orderResponse._id,
            amount: grandTotal,
            customerInfo: {
              name: deliveryInfo.name,
              email: deliveryInfo.email,
              address: deliveryInfo.street,
              city: deliveryInfo.city,
              state: deliveryInfo.state,
              zipCode: deliveryInfo.zipCode,
              phone: deliveryInfo.phone,
            },
          };

          const paymentResponse = await initiatePayment(paymentData);

          if (paymentResponse.error) {
            console.error("SSLCommerz payment error:", paymentResponse);
            setError(paymentResponse.error || "Failed to initialize payment");
            return;
          }

          if (paymentResponse.redirectUrl) {
            // Redirect to payment gateway
            console.log(
              "Redirecting to SSLCommerz:",
              paymentResponse.redirectUrl
            );
            setPaymentUrl(paymentResponse.redirectUrl);
            setRedirectToPaymentGateway(true);

            // Open in new window
            window.open(paymentResponse.redirectUrl, "_blank");

            // Clear cart
            dispatch(clearCart());
          } else {
            setError("Failed to initialize payment. Please try again.");
          }
        }
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 mt-28 text-center">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-xl mx-auto">
          <FaShoppingBag className="text-5xl text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            You need to add items to your cart before checking out.
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="px-6 py-3 bg-[#32a852] text-white rounded-lg hover:bg-[#2d9649] transition-colors"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  // Payment method selection section
  const renderPaymentMethodSection = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <FaCreditCard className="mr-2 text-[#32a852]" /> Payment Method
        </h2>

        <div className="space-y-4 mb-6">
          {/* Cash payment option */}
          <div
            className={`border ${
              paymentMethod === "cash"
                ? "border-[#32a852] bg-green-50"
                : "border-gray-200"
            } rounded-lg p-4 cursor-pointer`}
            onClick={() => setPaymentMethod("cash")}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  paymentMethod === "cash"
                    ? "border-[#32a852]"
                    : "border-gray-300"
                } flex items-center justify-center mr-3`}
              >
                {paymentMethod === "cash" && (
                  <div className="w-3 h-3 rounded-full bg-[#32a852]"></div>
                )}
              </div>
              <FaMoneyBillWave className="text-xl text-gray-600 mr-3" />
              <div>
                <h3 className="font-medium">Cash on Delivery</h3>
                <p className="text-sm text-gray-500">
                  Pay with cash when your order arrives
                </p>
              </div>
            </div>
          </div>

          {/* Stripe payment option */}
          <div
            className={`border ${
              paymentMethod === "stripe"
                ? "border-[#32a852] bg-green-50"
                : "border-gray-200"
            } rounded-lg p-4 cursor-pointer`}
            onClick={() => setPaymentMethod("stripe")}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  paymentMethod === "stripe"
                    ? "border-[#32a852]"
                    : "border-gray-300"
                } flex items-center justify-center mr-3`}
              >
                {paymentMethod === "stripe" && (
                  <div className="w-3 h-3 rounded-full bg-[#32a852]"></div>
                )}
              </div>
              <FaCreditCard className="text-xl text-gray-600 mr-3" />
              <div>
                <h3 className="font-medium">Credit/Debit Card (Stripe)</h3>
                <p className="text-sm text-gray-500">
                  Pay securely with your card via Stripe
                </p>
              </div>
            </div>
          </div>

          {/* SSLCommerz payment option */}
          <div
            className={`border ${
              paymentMethod === "card"
                ? "border-[#32a852] bg-green-50"
                : "border-gray-200"
            } rounded-lg p-4 cursor-pointer`}
            onClick={() => setPaymentMethod("card")}
          >
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  paymentMethod === "card"
                    ? "border-[#32a852]"
                    : "border-gray-300"
                } flex items-center justify-center mr-3`}
              >
                {paymentMethod === "card" && (
                  <div className="w-3 h-3 rounded-full bg-[#32a852]"></div>
                )}
              </div>
              <FaCreditCard className="text-xl text-gray-600 mr-3" />
              <div>
                <h3 className="font-medium">
                  Local Payment Methods (SSLCommerz)
                </h3>
                <p className="text-sm text-gray-500">
                  Pay with bKash, Nagad, Rocket, etc.
                </p>
              </div>
            </div>
          </div>
        </div>

        {paymentMethod === "card" && (
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <h3 className="font-medium mb-4 text-center">
              Available Payment Methods
            </h3>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <img
                src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png"
                alt="SSLCommerz"
                className="h-12"
              />
            </div>
            <p className="text-center text-sm text-gray-600 mb-2">
              We support bKash, Nagad, Rocket, Mastercard, Visa Card and many
              more payment methods
            </p>
            {redirectToPaymentGateway && (
              <div className="text-center mt-4">
                <p className="text-green-600 mb-2">
                  Redirecting you to the payment gateway...
                </p>
                <a
                  href={paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Go to Payment Page
                </a>
              </div>
            )}
          </div>
        )}

        {paymentMethod === "stripe" && (
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <h3 className="font-medium mb-4 text-center">
              Secure Card Payment
            </h3>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                alt="Stripe"
                className="h-10"
              />
            </div>
            <p className="text-center text-sm text-gray-600 mb-2">
              Secure payment processing by Stripe. Your card details are never
              stored on our servers.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen mt-32 md:mt-28">
        <div className="container mx-auto px-4 sm:px-6 py-8 mt-24">
          {/* Checkout Steps */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`flex flex-col items-center ${
                  step >= 1 ? "text-[#32a852]" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 1
                      ? "bg-[#32a852] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <FaUser />
                </div>
                <span className="text-sm mt-1 font-medium">Delivery Info</span>
              </div>
              <div
                className={`flex-1 h-1 mx-2 ${
                  step >= 2 ? "bg-[#32a852]" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`flex flex-col items-center ${
                  step >= 2 ? "text-[#32a852]" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 2
                      ? "bg-[#32a852] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <FaCreditCard />
                </div>
                <span className="text-sm mt-1 font-medium">Payment</span>
              </div>
              <div
                className={`flex-1 h-1 mx-2 ${
                  step >= 3 ? "bg-[#32a852]" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`flex flex-col items-center ${
                  step >= 3 ? "text-[#32a852]" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 3
                      ? "bg-[#32a852] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <FaShoppingBag />
                </div>
                <span className="text-sm mt-1 font-medium">Confirm</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="max-w-5xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Steps Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-6 mb-6"
              >
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                      <FaTruck className="mr-2 text-[#32a852]" /> Delivery
                      Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Full Name*
                        </label>
                        <div className="flex items-center">
                          <FaUser className="text-gray-400 absolute ml-3" />
                          <input
                            type="text"
                            name="name"
                            value={deliveryInfo.name}
                            onChange={handleInputChange}
                            className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32a852] focus:border-transparent cursor-pointer"
                            placeholder="Your full name"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <div className="flex items-center">
                          <FaEnvelope className="text-gray-400 absolute ml-3" />
                          <input
                            type="email"
                            name="email"
                            value={deliveryInfo.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32a852] focus:border-transparent cursor-pointer"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Street Address*
                      </label>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-gray-400 absolute ml-3" />
                        <input
                          type="text"
                          name="street"
                          value={deliveryInfo.street}
                          onChange={handleInputChange}
                          className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32a852] focus:border-transparent cursor-pointer"
                          placeholder="Street address, house number, etc."
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          City*
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={deliveryInfo.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32a852] focus:border-transparent cursor-pointer"
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          State/Province*
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={deliveryInfo.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32a852] focus:border-transparent cursor-pointer"
                          placeholder="State"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          ZIP / Postal Code*
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={deliveryInfo.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32a852] focus:border-transparent cursor-pointer"
                          placeholder="Postal code"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Phone Number*
                        </label>
                        <div className="flex items-center">
                          <FaPhoneAlt className="text-gray-400 absolute ml-3" />
                          <input
                            type="tel"
                            name="phone"
                            value={deliveryInfo.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32a852] focus:border-transparent cursor-pointer"
                            placeholder="Your phone number"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Special Instructions
                      </label>
                      <textarea
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32a852] focus:border-transparent cursor-pointer"
                        rows="3"
                        placeholder="Add any special delivery instructions or notes for your order"
                      ></textarea>
                    </div>
                  </div>
                )}

                {step === 2 && renderPaymentMethodSection()}

                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6 flex items-center">
                      <FaShoppingBag className="mr-2 text-[#32a852]" /> Order
                      Review
                    </h2>

                    <div className="mb-6">
                      <h3 className="font-medium text-gray-700 mb-2">
                        Delivery Address
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">{deliveryInfo.name}</p>
                        <p>{deliveryInfo.street}</p>
                        <p>
                          {deliveryInfo.city}, {deliveryInfo.state}{" "}
                          {deliveryInfo.zipCode}
                        </p>
                        <p>Phone: {deliveryInfo.phone}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-medium text-gray-700 mb-2">
                        Payment Method
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                        {paymentMethod === "cash" ? (
                          <>
                            <FaMoneyBillWave className="text-gray-600 mr-2" />
                            <span>Cash on Delivery</span>
                          </>
                        ) : paymentMethod === "stripe" ? (
                          <>
                            <FaCreditCard className="text-gray-600 mr-2" />
                            <span>Credit/Debit Card (Stripe)</span>
                          </>
                        ) : (
                          <>
                            <FaCreditCard className="text-gray-600 mr-2" />
                            <span>Local Payment Methods (SSLCommerz)</span>
                          </>
                        )}
                      </div>
                    </div>

                    {specialInstructions && (
                      <div className="mb-6">
                        <h3 className="font-medium text-gray-700 mb-2">
                          Special Instructions
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p>{specialInstructions}</p>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-4 mt-6">
                      <p className="text-gray-600 mb-2">
                        By completing this order, you agree to our Terms &
                        Conditions and Privacy Policy.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <FaArrowLeft className="mr-2" /> Previous
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate("/cart")}
                      className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <FaArrowLeft className="mr-2" /> Back to Cart
                    </button>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center px-6 py-3 bg-[#32a852] text-white rounded-lg hover:bg-[#2d9649] transition-colors"
                    >
                      Next <FaArrowRight className="ml-2" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCheckout}
                      disabled={loading}
                      className="flex items-center px-8 py-3 bg-[#32a852] text-white rounded-lg hover:bg-[#2d9649] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {loading ? "Processing..." : "Place Order"}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6 sticky top-32"
              >
                <h2 className="text-xl font-semibold mb-4 pb-3 border-b">
                  Order Summary
                </h2>
                <div className="max-h-[300px] overflow-y-auto mb-4 pr-2">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex py-3 border-b">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.src = "/images/burger.png";
                          e.target.onerror = null;
                        }}
                      />
                      <div className="ml-3 flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-gray-600">
                            x{item.quantity}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#32a852]">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <OrderSuccessMessage
        show={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigate("/profile", { state: { showOrders: true } });
        }}
      />
    </>
  );
};

export default CheckoutPage;
