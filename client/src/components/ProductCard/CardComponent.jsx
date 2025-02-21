import { useState, useEffect, useContext } from "react";
import { getSubcategoryById } from "../../service/categoriesService.js";
import {
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
  Alert,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import Icon from "../Icons.jsx";

import FavoritosContext from "../../context/FavoritosContext.jsx";
import CartContext from "../../context/CartContext.jsx";
import useAuth from "../../hook/useAuth.jsx";
import useCategories from "../../hook/useCategories.jsx";
import useIsMobile from "../../hook/useIsMobile.jsx";
import { formatPrice } from "../../helpers/formatPrice.jsx";

const CardComponent = ({ producto }) => {
  const { favoritos, toggleFavorite } = useContext(FavoritosContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useAuth();
  const { menus: categories } = useCategories();
  const isMobile = useIsMobile();

  const [cartTooltipOpen, setCartTooltipOpen] = useState(false);
  const [favTooltipOpen, setFavTooltipOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [isFavorite, setIsFavorite] = useState(
    favoritos.some((fav) => fav.product_id === producto.product_id)
  );

  const [subcategoryName, setSubcategoryName] = useState("");
  const [categoryName, setCategoryName] = useState("Desconocida");

  useEffect(() => {
    if (producto.subcategory_id) {
      getSubcategoryById(producto.subcategory_id)
        .then((res) => {
          const subcatName = res.data?.name_subcategories;
          setSubcategoryName(subcatName ? subcatName : "Desconocida");
        })
        .catch((error) => {
          console.error("Error al obtener la subcategoría:", error);
          setSubcategoryName("Desconocida");
        });
    }
  }, [producto.subcategory_id]);

  useEffect(() => {
    const category = categories.find((cat) => cat.id === producto.category_id);
    if (category) {
      setCategoryName(category.title);
    }
  }, [categories, producto.category_id]);

  useEffect(() => {
    setIsFavorite(favoritos.some((fav) => fav.product_id === producto.product_id));
  }, [favoritos, producto.product_id]);

  const handleAddToCart = () => {
    addToCart({
      product_id: producto.product_id,
      name_product: producto.name_product,
      price: producto.price,
      image_url: producto.image_url,
    });

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const handleCartButtonClick = () => {
    if (!user) return;
    if (isMobile) {
      setCartTooltipOpen((prev) => !prev);
    }
    handleAddToCart();
  };

  const handleFavoriteButtonClick = () => {
    if (!user) {
      if (isMobile) {
        setFavTooltipOpen((prev) => !prev);
      }
      return;
    }
    toggleFavorite(producto);
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="relative max-w-sm bg-white shadow-md shadow-[--color-primary-light] border-[1.5px] border-[var(--color-primary-dark)]">
      <CardHeader>
        <h3 className="text-base max-h-[25px] font-epilogue text-[var(--color-primary-dark)] font-bold -mt-1">
          {producto.name_product}
        </h3>
      </CardHeader>

      <CardBody>
        <div className="relative w-full max-h-[230px] flex flex-col justify-center items-center">
          <div className="absolute top-2 left-2 font-epilogue font-semibold text-[var(--color-secondary-dark)] z-20 -mt-5 text-sm">
            <p>Marca {producto.brand}</p>
          </div>
          <Image
            isZoomed
            src={producto.image_url}
            alt={producto.name_product}
            className="rounded-t-md w-full max-h-[230px] object-cover"
          />
          <Tooltip
            content={
              user
                ? "Agregar a favoritos"
                : "Debes iniciar sesión para agregar a favoritos"
            }
            isOpen={isMobile ? favTooltipOpen : false}
            onOpenChange={(open) => {
              if (isMobile) setFavTooltipOpen(open);
            }}
          >
            <button
              onClick={handleFavoriteButtonClick}
              className={`absolute bottom-2 right-2 text-4xl z-10 transition-colors ${user
                  ? isFavorite
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                  : "text-gray-400"
                }`}
            >
              <Icon name="heart" />
            </button>
          </Tooltip>
        </div>
      </CardBody>

      <CardBody className="flex flex-col space-y-1">
        <p className="text-[var(--color-primary-dark)] font-epilogue font-bold text-2xl text-right">
          ${formatPrice(producto.price)}
        </p>
        <p className="text-xs text-gray-500">
          Subcategoría:{" "}
          <span className="text-[var(--color-highlight)]">{subcategoryName}</span>
        </p>
        <p className="text-xs text-gray-500">
          Categoría:{" "}
          <span className="text-[var(--color-highlight)]">{categoryName}</span>
        </p>
      </CardBody>

      <CardBody className="font-epilogue">
        <p className="text-sm text-gray-600">{producto.description}</p>
      </CardBody>

      <CardFooter className="flex flex-col justify-between items-center font-arvo relative">
        <Tooltip
          content={
            !user
              ? "Debes iniciar sesión para añadir al carrito"
              : "Añadir al carrito"
          }
          isOpen={isMobile ? cartTooltipOpen : false}
          onOpenChange={(open) => {
            if (isMobile) setCartTooltipOpen(open);
          }}
        >
          <Button
            size="xs"
            onPress={handleCartButtonClick}
            disabled={!user}
            className={`w-full mb-1 ${user
                ? "bg-white text-[var(--color-highlight)] border-[1.5px] border-[var(--color-highlight)] hover:bg-[var(--color-primary)] hover:text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {user
              ? "Añade al carrito"
              : "Debes iniciar sesión para añadir al carrito"}
            <Icon name="cart" className="ml-1" />
          </Button>
        </Tooltip>
        {showAlert && (
          <Alert className="absolute top-[110%]" color="success" variant="bordered">
            Producto agregado al carrito con éxito.
          </Alert>
        )}
        <Button
          as={Link}
          to={`/product/${producto.product_id}`}
          size="xs"
          className="w-full bg-[var(--color-highlight)] text-white hover:bg-white hover:text-[var(--color-highlight)] border-[1.5px] border-[var(--color-highlight)]"
        >
          Ver detalle del producto <strong>AQUÍ</strong>
        </Button>

      </CardFooter>
    </Card>
  );
};

export default CardComponent;





