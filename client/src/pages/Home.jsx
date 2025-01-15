import SiteUnderConstruction from "./SiteUnderConstruction.jsx";
import Carousel from "../components/Carousel.jsx";
import BannerBrands from "../components/BannerBrands.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
function Home() {
    return (
        <div>
            <Carousel />
            <BannerBrands />
            <FeaturedProducts />
            <SiteUnderConstruction />
        </div>
    );
}

export default Home;