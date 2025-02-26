import { useState, useContext, useCallback, useMemo, useEffect } from "react";
import {
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
  Spinner,
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

  const [cartStatus, setCartStatus] = useState("idle");
  const [cartTooltipOpen, setCartTooltipOpen] = useState(false);
  const [favTooltipOpen, setFavTooltipOpen] = useState(false);

  const [subcategoryName, setSubcategoryName] = useState("");
  const [categoryName, setCategoryName] = useState("Desconocida");

  useEffect(() => {
    if (producto.subcategory_id) {
      import("../../service/categoriesService.js").then(({ getSubcategoryById }) => {
        getSubcategoryById(producto.subcategory_id)
          .then((res) => {
            const subcatName = res.data?.name_subcategories;
            setSubcategoryName(subcatName ? subcatName : "Desconocida");
          })
          .catch((error) => {
            console.error("Error al obtener la subcategoría:", error);
            setSubcategoryName("Desconocida");
          });
      });
    }
  }, [producto.subcategory_id]);

  useEffect(() => {
    const category = categories.find((cat) => cat.id === producto.category_id);
    if (category) {
      setCategoryName(category.title);
    }
  }, [categories, producto.category_id]);

  const isFavorite = useMemo(
    () => favoritos.some((fav) => fav.product_id === producto.product_id),
    [favoritos, producto.product_id]
  );

  const handleAddToCart = useCallback(async () => {
    try {
      setCartStatus("loading");
      await addToCart({
        product_id: producto.product_id,
        name_product: producto.name_product,
        price: producto.price,
        image_url: producto.image_url,
      });
      setCartStatus("success");
      setTimeout(() => {
        setCartStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      setCartStatus("idle");
    }
  }, [addToCart, producto]);

  const handleCartButtonClick = useCallback(() => {
    if (!user) return;
    if (isMobile) {
      setCartTooltipOpen((prev) => !prev);
    }
    handleAddToCart();
  }, [user, isMobile, handleAddToCart]);

  const handleFavoriteButtonClick = useCallback(() => {
    if (!user) {
      if (isMobile) {
        setFavTooltipOpen((prev) => !prev);
      }
      return;
    }
    toggleFavorite(producto);
  }, [user, isMobile, toggleFavorite, producto]);

  return (
    <Card className="relative max-w-sm bg-white shadow-md border-[2px] border-[var(--color-primary-dark)]">
      <CardHeader>
        <h3 className="text-base font-epilogue text-[var(--color-primary-dark)] font-bold">
          {producto.name_product}
        </h3>
      </CardHeader>

      <CardBody>
        <div className="relative flex flex-col items-center">
          <div className="absolute -top-4 left-2 font-epilogue font-semibold text-[var(--color-secondary-dark)] text-sm z-20 animate-text-color-change">
            <p>Marca {producto.brand}</p>
          </div>
          <Image
            isZoomed
            src={producto.image_url}
            alt={producto.name_product}
            className="rounded-t-md object-cover w-full h-60"
          />
          <Tooltip
            content={
              user
                ? "Agregar a favoritos"
                : "Debes iniciar sesión para agregar a favoritos"
            }
            isOpen={favTooltipOpen}
            onOpenChange={setFavTooltipOpen}
          >
            <button
              onClick={handleFavoriteButtonClick}
              onMouseEnter={() => {
                if (!isMobile) setFavTooltipOpen(true);
              }}
              onMouseLeave={() => {
                if (!isMobile) setFavTooltipOpen(false);
              }}
              className={`absolute bottom-2 right-2 text-4xl z-10 transition-colors ${
                user
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

      <CardFooter className="flex flex-col items-center font-arvo relative">
        <Tooltip
          content={
            !user
              ? "Debes iniciar sesión para añadir al carrito"
              : "Añadir al carrito"
          }
          isOpen={cartTooltipOpen}
          onOpenChange={setCartTooltipOpen}
        >
          <Button
            size="xs"
            onPress={handleCartButtonClick}
            onMouseEnter={() => {
              if (!isMobile) setCartTooltipOpen(true);
            }}
            onMouseLeave={() => {
              if (!isMobile) setCartTooltipOpen(false);
            }}
            disabled={!user || cartStatus !== "idle"}
            className={`w-full mb-1 ${
              user
                ? "bg-white text-[var(--color-highlight)] border-[1.5px] border-[var(--color-highlight)] hover:bg-[var(--color-primary)] hover:text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {user && cartStatus === "idle" && (
              <>
                Añade al carrito <Icon name="cart" className="ml-1" />
              </>
            )}
            {cartStatus === "loading" && <Spinner size="sm" />}
            {cartStatus === "success" && (
              <>
                <Icon name="check" />
                <span className="ml-1">Producto agregado</span>
              </>
            )}
            {!user && "Debes iniciar sesión para añadir al carrito"}
          </Button>
        </Tooltip>
        <Button
          as={Link}
          to={`/product/${producto.product_id}`}
          size="xs"
          className="w-full bg-[var(--color-highlight)] text-white hover:bg-[var(--color-primary-dark)] border-[1.5px] border-[var(--color-highlight)]"
        >
          Ver detalle del producto <strong>AQUÍ</strong>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;



