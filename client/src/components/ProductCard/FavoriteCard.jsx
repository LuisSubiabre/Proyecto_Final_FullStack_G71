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

  const handleToggleFavorite = () => {
    if (user) {
      if (isMobile) setFavTooltipOpen((prev) => !prev);
      toggleFavorite(producto);
    }
  };

  const handleAddToCart = () => {
    if (!user) return;
    if (isMobile) setCartTooltipOpen((prev) => !prev);

    // Cambiar estado a loading
    setCartStatus("loading");

    // Llamamos a la función para agregar al carrito
    addToCart({
      product_id: producto.product_id,
      name_product: producto.product_name,
      price: producto.price,
      image_url: producto.image_url,
    });

    // Simulamos una espera para mostrar el spinner y luego el visto bueno
    setTimeout(() => {
      setCartStatus("success");
      // Después de 2 segundos volvemos al icono original
      setTimeout(() => {
        setCartStatus("idle");
      }, 2000);
    }, 1000);
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
              isOpen={isMobile ? favTooltipOpen : undefined}
              onOpenChange={(open) => {
                if (isMobile) setFavTooltipOpen(open);
              }}
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
        </div>

        <CardFooter className="p-0 flex gap-2 mt-2 justify-end">
          {user ? (
            <Tooltip
              content="Añadir al carrito"
              isOpen={isMobile ? cartTooltipOpen : undefined}
              onOpenChange={(open) => {
                if (isMobile) setCartTooltipOpen(open);
              }}
            >
              <Button
                size="sm"
                onPress={handleAddToCart}
                className="p-2 bg-white text-[var(--color-highlight)] border border-[var(--color-highlight)] hover:bg-[var(--color-primary)] hover:text-white"
                // Deshabilitamos el botón mientras no esté en estado idle
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

          <Link to={`/product/${producto.product_id}`}>
            <Tooltip
              content="Ver detalle del producto"
              isOpen={isMobile ? detailTooltipOpen : undefined}
              onOpenChange={(open) => {
                if (isMobile) setDetailTooltipOpen(open);
              }}
            >
              <Button
                size="sm"
                onPress={handleDetailClick}
                className="p-2 mr-2 bg-[var(--color-highlight)] text-white hover:bg-white hover:text-[var(--color-highlight)] border border-[var(--color-highlight)]"
              >
                <Icon name="search" />
              </Button>
            </Tooltip>
          </Link>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

export default FavoriteCard;
