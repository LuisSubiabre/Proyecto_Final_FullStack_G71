import { useState, useContext } from "react";
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
import { formatPrice } from "../../helpers/formatPrice.jsx";
import useIsMobile from "../../hook/useIsMobile.jsx";

const FavoriteCard = ({ producto }) => {
  const { toggleFavorite } = useContext(FavoritosContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useAuth();
  const isMobile = useIsMobile();

  // Estados para controlar los tooltips en mobile
  const [favTooltipOpen, setFavTooltipOpen] = useState(false);
  const [cartTooltipOpen, setCartTooltipOpen] = useState(false);
  const [detailTooltipOpen, setDetailTooltipOpen] = useState(false);

  // Estado para controlar el estatus del botón de carrito
  const [cartStatus, setCartStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleToggleFavorite = () => {
    if (user) {
      if (isMobile) setFavTooltipOpen((prev) => !prev);
      toggleFavorite(producto);
    }
  };

  const handleAddToCart = async () => {
    if (!user) return;
    if (isMobile) setCartTooltipOpen((prev) => !prev);

    setCartStatus("loading");
    setErrorMessage(""); // Limpiamos cualquier mensaje de error anterior

    try {
      await addToCart({
        product_id: producto.product_id,
        name_product: producto.product_name,
        price: producto.price,
        image_url: producto.image_url,
      });
      setCartStatus("success");
      setTimeout(() => {
        setCartStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      setErrorMessage("Error al agregar el producto al carrito, intenta nuevamente.");
      setCartStatus("idle");
    }
  };

  const handleDetailClick = () => {
    if (isMobile) setDetailTooltipOpen((prev) => !prev);
  };

  return (
    <Card className="flex flex-row items-center w-96 bg-white shadow-md p-2">
      <div className="h-20">
        <div className="relative">
          <Image
            src={producto.image_url}
            alt={producto.product_name}
            className="w-full h-20 object-cover rounded"
          />
        </div>
      </div>

      <CardBody className="w-2/3 flex flex-col justify-between p-2 ml-2">
        <CardHeader className="mb-2 p-0 relative">
          <h3 className="text-sm font-epilogue font-bold text-[var(--color-primary-dark)]">
            {producto.product_name}
          </h3>

          {user ? (
            <Tooltip
              content="Eliminar de favoritos"
              {...(isMobile && {
                isOpen: favTooltipOpen,
                onOpenChange: setFavTooltipOpen,
              })}
            >
              <button
                onClick={handleToggleFavorite}
                className="absolute top-2 right-2 text-2xl z-10 text-red-500"
              >
                <Icon name="heart" />
              </button>
            </Tooltip>
          ) : (
            <Tooltip content="Debes iniciar sesión para modificar favoritos">
              <button
                disabled
                className="absolute top-2 right-2 text-2xl z-10 text-gray-400"
              >
                <Icon name="heart" />
              </button>
            </Tooltip>
          )}
        </CardHeader>

        <div className="flex-1">
          <p className="text-sm font-epilogue text-[var(--color-primary-dark)]">
            ${formatPrice(producto.price)}
          </p>
          {errorMessage && (
            <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
          )}
        </div>

        <CardFooter className="p-0 flex gap-2 mt-2 justify-end">
          {user ? (
            <Tooltip
              content="Añadir al carrito"
              {...(isMobile && {
                isOpen: cartTooltipOpen,
                onOpenChange: setCartTooltipOpen,
              })}
            >
              <Button
                size="sm"
                onPress={handleAddToCart}
                className="p-2 bg-white text-[var(--color-highlight)] border border-[var(--color-highlight)] hover:bg-[var(--color-primary)] hover:text-white"
                disabled={cartStatus !== "idle"}
              >
                {cartStatus === "idle" && <Icon name="cart" />}
                {cartStatus === "loading" && <Spinner size="sm" />}
                {cartStatus === "success" && <Icon name="check" />}
              </Button>
            </Tooltip>
          ) : (
            <Tooltip content="Debes iniciar sesión para añadir al carrito">
              <Button
                size="sm"
                disabled
                className="p-2 bg-gray-300 text-gray-500 cursor-not-allowed"
              >
                <Icon name="cart" />
              </Button>
            </Tooltip>
          )}

          <Tooltip
            content="Ver detalle del producto"
            {...(isMobile && {
              isOpen: detailTooltipOpen,
              onOpenChange: setDetailTooltipOpen,
            })}
          >
            <Button
              as={Link}
              to={`/product/${producto.product_id}`}
              size="sm"
              onPress={handleDetailClick}
              className="p-2 mr-2 bg-[var(--color-highlight)] text-white hover:bg-white hover:text-[var(--color-highlight)] border border-[var(--color-highlight)]"
            >
              <Icon name="search" />
            </Button>
          </Tooltip>

        </CardFooter>
      </CardBody>
    </Card>
  );
};

export default FavoriteCard;



