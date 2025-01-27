import { Card } from "@nextui-org/react";
import brandsData from "../data/brands.json";

const BannerBrands = () => {
    return (
        <div className="bg-[url('https://res.cloudinary.com/dxxrdckad/image/upload/v1736947360/fondo_login_register_nqwroy_2792d1.jpg')] bg-cover  p-2">
            <div className="container mx-auto text-center">
                <h2 className="text-2xl font-osvald text-[var(--color-primary-light)] mb-4 animate-text-color-change font-bold">
                    CON NOSOTROS ENCONTRARÁS ESTAS INCREÍBLES MARCAS
                </h2>
                <div className="flex flex-wrap justify-between gap-4">
                    {brandsData.map((brand) => (
                        <Card
                            key={brand.id}
                            isHoverable
                            isPressable
                            className="flex items-center justify-center bg-[var(--color-secondary)] p-2 w-16 h-9 md:w-28 md:h-16 lg:w-36 lg:h-20 shadow-lg rounded-lg"
                        >
                            <img
                                src={brand.image}
                                alt={`${brand.name} logo`}
                                className="h-full object-contain"
                            />
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerBrands;
