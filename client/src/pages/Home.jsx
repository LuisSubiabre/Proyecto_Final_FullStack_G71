import SiteUnderConstruction from "./SiteUnderConstruction.jsx";
import Carousel from "../components/Carousel.jsx";
import BannerBrands from "../components/BannerBrands.jsx";
function Home() {
    return (
        <div>
            <Carousel />
            <BannerBrands />
            <SiteUnderConstruction />
        </div>
    );
}

export default Home;