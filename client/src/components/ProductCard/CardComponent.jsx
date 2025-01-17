import { useState, useContext } from "react";
import FavoritosContext from "../../context/FavoritosContext.jsx";
import {
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

const CardComponent = ({ producto }) => {
  const { favoritos, setFavoritos } = useContext(FavoritosContext);
  const [showAlert, setShowAlert] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    favoritos.some((fav) => fav.id === producto.id)
  );

  const handleAddToCart = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000); // Oculta la alerta después de 4 segundos
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      // Elimina el producto de los favoritos
      setFavoritos((prevFavoritos) =>
        prevFavoritos.filter((fav) => fav.id !== producto.id)
      );
    } else {
      // Agrega el producto a los favoritos
      setFavoritos((prevFavoritos) => [...prevFavoritos, producto]);
    }
    setIsFavorite(!isFavorite); // Actualiza el estado local
  };

  return (
    <Card className="relative max-w-sm bg-white shadow-md shadow-[--color-primary-light] border-[1.5px] border-[var(--color-primary-dark)]">
      <CardHeader>
        <h3 className="text-lg max-h-[32px] text-center font-epilogue text-[var(--color-primary-dark)] font-semibold">
          {producto.nombre}
        </h3>
      </CardHeader>
      <CardBody className="relative">
        {/* Contenedor de la imagen con posición relativa */}
        <div className="relative">
          <Image
            isZoomed
            src={producto.imagen}
            alt={producto.nombre}
            width="100%"
            className="rounded-t-md w-full object-cover"
          />
          {/* Botón de favorito posicionado sobre la imagen */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute bottom-2 right-2 text-4xl z-10 transition-colors ${
              isFavorite ? "text-red-500" : "text-gray-400"
            } hover:text-red-500`}
          >
            <Icon name="heart" />
          </button>
        </div>
      </CardBody>
      <CardBody className="font-epilogue">
        <p className="text-sm text-gray-600">{producto.descripcion}</p>
        <p className="text-xs text-gray-500 mt-1">
          Categoría: {producto.categoria}
        </p>
      </CardBody>
      <CardFooter className="flex flex-col justify-between items-center font-arvo relative">
        <Button
          size="xs"
          onPress={handleAddToCart}
          className="w-full mb-2 bg-white text-[var(--color-highlight)] border-[1.5px] border-[var(--color-highlight)] hover:bg-[var(--color-primary)] hover:text-white"
        >
          Añade al carrito
          <Icon name="cart" className="ml-1" />
        </Button>
        {showAlert && (
          <Alert
            className="absolute top-[110%]"
            color="success"
            variant="bordered"
          >
            Producto agregado al carrito con éxito.
          </Alert>
        )}
        <Link to={`/product/${producto.id}`} className="w-full mt-2">
          <Button
            size="xs"
            className="w-full bg-[var(--color-highlight)] text-white hover:bg-white hover:text-[var(--color-highlight)] border-[1.5px] border-[var(--color-highlight)]"
          >
            Ver detalle del producto <strong>AQUÍ</strong>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;





