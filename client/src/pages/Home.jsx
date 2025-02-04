import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Alert } from "@nextui-org/react";

import ContactUs from "../components/ContactUs.jsx";
import Carousel from "../components/Carousel.jsx";
import BannerBrands from "../components/BannerBrands.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import NewProducts from "../components/NewProducts.jsx";
import DiscountedProducts from "../components/DiscountedProducts.jsx";

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const authRequired = searchParams.get("authRequired");

    useEffect(() => {
        if (authRequired) {
            const timer = setTimeout(() => {
                searchParams.delete("authRequired");
                setSearchParams(searchParams);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [authRequired, searchParams, setSearchParams]);

    return (
        <div className="p-4">
            {authRequired && (
                <div className="relative mb-4">
                    <Alert color="warning" variant="bordered">
                        <strong>Acceso restringido:</strong> Fuiste redirigido al inicio. Debes estar autenticado para ver esa página.
                    </Alert>
                    <button
                        onClick={() => {
                            searchParams.delete("authRequired");
                            setSearchParams(searchParams);
                        }}
                        className="absolute top-1 right-1 text-[var(--color-highlight)] hover:text-[var(--color-highlight-dark)] text-xl leading-none"
                    >
                        &times;
                    </button>
                </div>
            )}
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
