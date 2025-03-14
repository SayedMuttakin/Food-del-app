import CustomerReviews from "../components/CustomerReviews";
import FavoriteCuisines from "../components/FavoriteCuisines";
import Footer from "../components/Footer";
import MagicSlider from "../components/MagicSlider";

import NewsletterSection from "../components/NewsletterSection";
import SpecialOffers from "../components/SpecialOffers";

const HomePage = () => {
  return (
    <div className="bg-gray-100">
      <MagicSlider />
      <SpecialOffers />
      <FavoriteCuisines />
      <NewsletterSection />
      <CustomerReviews />
      <Footer />
    </div>
  );
};

export default HomePage;
