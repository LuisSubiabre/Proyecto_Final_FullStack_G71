import ContactUs from "../components/ContactUs.jsx";
import Carousel from "../components/Carousel.jsx";
import BannerBrands from "../components/BannerBrands.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import NewProducts from "../components/NewProducts.jsx";
function Home() {
    return (
        <div>
            <Carousel />
            <BannerBrands />
            <FeaturedProducts />
            <NewProducts />
            <ContactUs />
        </div>
    );
}

export default Home;