import ContactUs from "../components/ContactUs.jsx";
import Carousel from "../components/Carousel.jsx";
import BannerBrands from "../components/BannerBrands.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import NewProducts from "../components/NewProducts.jsx";
import DiscountedProducts from "../components/DiscountedProducts.jsx";

function Home() {
    return (
        <div>
            <Carousel />
            <BannerBrands />
            <DiscountedProducts />
            <FeaturedProducts />
            <NewProducts />
            <ContactUs />
        </div>
    );
}

export default Home;