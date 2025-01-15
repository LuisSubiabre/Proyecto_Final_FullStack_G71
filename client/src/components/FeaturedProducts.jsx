import FeaturedCard from "./FeaturedCard.jsx";

const FeaturedProducts = () => {
    return (
        <div className="relative w-full py-4 bg-[url('https://res.cloudinary.com/dxxrdckad/image/upload/v1729796934/fondo_producto_destacado_cbu2jz.jpg')] bg-cover">
            <div className="container mx-auto px-4">
                <h2 className="text-[60px] font-bold text-center text-white mb-10 custom-text-stroke font-epilogue">
                    Productos Destacados
                </h2>
                <div className="flex flex-wrap justify-around">
                    <div>
                        <FeaturedCard />
                    </div>
                    <div className="xl:mt-[150px]">
                        <FeaturedCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;
