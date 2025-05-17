import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "./redux/cartSlice";
import Navbar from "./components/Navbar";
import LowerNavbar from "./components/LowerNavbar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import AuthForm from "./components/AuthForm";
import DetailsPage from "./pages/DetailsPage";
import Reservation from "./pages/Reservation/Reservation";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentFailedPage from "./pages/PaymentFailedPage";
import CreateFirstAdmin from "./components/admin/CreateFirstAdmin";

function App() {
  const dispatch = useDispatch();

  // Initialize cart from localStorage when app loads
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch(setCart(parsedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        localStorage.removeItem("cart");
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <LowerNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<AuthForm isLogin={true} />} />
          <Route path="/register" element={<AuthForm isLogin={false} />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/create-first-admin" element={<CreateFirstAdmin />} />
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/order-success/:orderId"
            element={<OrderSuccessPage />}
          />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-failed" element={<PaymentFailedPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
