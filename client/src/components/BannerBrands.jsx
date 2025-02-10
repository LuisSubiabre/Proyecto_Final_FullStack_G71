import { Card } from "@nextui-org/react";
import brandsData from "../data/brands.json";
import { useNavigate } from "react-router-dom";

const BannerBrands = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brandName) => {
    navigate(`search-results?query=${brandName}`);
  };

  return (
    <div className="bg-[url('https://res.cloudinary.com/libreriaalondra/image/upload/v1736947360/fondo_login_register_nqwroy_2792d1.jpg')] bg-cover p-2">
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
              onClick={() => handleBrandClick(brand.name)}
              className="flex items-center justify-center bg-[var(--color-secondary)] p-2 w-16 h-9 md:w-28 md:h-16 lg:w-36 lg:h-20 shadow-lg rounded-lg cursor-pointer transition-transform hover:scale-105"
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
