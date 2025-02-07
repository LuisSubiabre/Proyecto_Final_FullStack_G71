import { useState, useEffect, useContext } from "react";
import { getSubcategoryById } from "../../service/categoriesService.js";
import { Tooltip, Card, CardHeader, CardBody, CardFooter, Button, Image, Alert } from "@nextui-org/react";
import { Link } from "react-router-dom";
import Icon from "../Icons.jsx";
import FavoritosContext from "../../context/FavoritosContext.jsx";
import CartContext from "../../context/CartContext.jsx";
import useAuth from "../../hook/useAuth.jsx";
import useCategories from "../../hook/useCategories.jsx";

const CardComponent = ({ producto }) => {
  const { favoritos, setFavoritos } = useContext(FavoritosContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useAuth();

  const { menus: categories } = useCategories();
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

  const handleToggleFavorite = () => {
    if (user) {
      if (isFavorite) {
        setFavoritos((prevFavoritos) =>
          prevFavoritos.filter((fav) => fav.product_id !== producto.product_id)
        );
      } else {
        setFavoritos((prevFavoritos) => [...prevFavoritos, producto]);
      }
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <Card className="relative max-w-sm bg-white shadow-md shadow-[--color-primary-light] border-[1.5px] border-[var(--color-primary-dark)]">
      <CardHeader>
        <h3 className="text-lg max-h-[25px] font-epilogue text-[var(--color-primary-dark)] font-bold">
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
          {user ? (
            <Tooltip content="Agregar a favoritos">
              <button
                onClick={handleToggleFavorite}
                className={`absolute bottom-2 right-2 text-4xl z-10 transition-colors ${isFavorite ? "text-red-500" : "text-gray-400"
                  } hover:text-red-500`}
              >
                <Icon name="heart" />
              </button>
            </Tooltip>
          ) : (
            <Tooltip content="Debes iniciar sesión para agregar a favoritos">
              <button
                disabled
                className="absolute bottom-2 right-2 text-4xl z-10 text-gray-400"
              >
                <Icon name="heart" />
              </button>
            </Tooltip>
          )}
        </div>
      </CardBody>

      <CardBody className="flex flex-col space-y-1">
        <p className="text-[var(--color-primary-dark)] font-epilogue font-bold text-2xl text-right">
          ${producto.price}
        </p>
        <p className="text-xs text-gray-500">Subcategoría: {subcategoryName}</p>
        <p className="text-xs text-gray-500">Categoría: {categoryName}</p>
      </CardBody>

      <CardBody className="font-epilogue">
        <p className="text-sm text-gray-600">{producto.description}</p>
      </CardBody>
      <CardFooter className="flex flex-col justify-between items-center font-arvo relative">
        <Tooltip content={!user ? "Debes iniciar sesión para añadir al carrito" : "Añadir al carrito"}>
          <Button
            size="xs"
            onPress={handleAddToCart}
            disabled={!user}
            className={`w-full mb-1 ${user ? "bg-white text-[var(--color-highlight)] border-[1.5px] border-[var(--color-highlight)] hover:bg-[var(--color-primary)] hover:text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Añade al carrito
            <Icon name="cart" className="ml-1" />
          </Button>
        </Tooltip>
        {showAlert && (
          <Alert className="absolute top-[110%]" color="success" variant="bordered">
            Producto agregado al carrito con éxito.
          </Alert>
        )}
        <Link to={`/product/${producto.product_id}`} className="w-full mt-0.5">
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








