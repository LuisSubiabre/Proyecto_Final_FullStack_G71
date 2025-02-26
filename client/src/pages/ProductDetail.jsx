import { useParams } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts";
import NewProducts from "../components/NewProducts";
import CartContext from "../context/CartContext.jsx";
import {
  Button,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Spinner,
} from "@nextui-org/react";
import Icon from "../components/Icons";
import { useContext, useEffect, useState } from "react";
import Comments from "../components/Comments.jsx";
import { getProductById } from "../service/productService.js";
import useAuth from "../hook/useAuth.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const { addToCart } = useContext(CartContext);
  const [cartStatus, setCartStatus] = useState("idle");
  const [showComments, setShowComments] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getProductoDetalle(id);
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) return;
    try {
      setCartStatus("loading");
      await addToCart({
        product_id: producto.id,
        name_product: producto.nombre,
        price: producto.precio,
        image_url: producto.imagen,
      });
      disminuirCantidad();
      setCartStatus("success");
      setTimeout(() => {
        setCartStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      setCartStatus("idle");
    }
  };

  const disminuirCantidad = () => {
    if (producto.cantidad > 0) {
      setProducto({ ...producto, cantidad: producto.cantidad - 1 });
    }
  };

  const getProductoDetalle = async (id) => {
    try {
      const response = await getProductById(id);
      const data = response.data;
      setProducto({
        id: data.product_id,
        nombre: data.name_product,
        descripcion: data.description,
        marca: data.brand,
        precio: data.price,
        cantidad: data.quantity,
        categoriaId: data.category_id,
        categoryName: data.category_name,
        subcategoryName: data.subcategory_name,
        imagen: data.image_url,
      });
    } catch (error) {
      console.error("Error al cargar el producto", error);
    }
  };

  return (
    <>
      <section className="p-6 bg-[var(--color-neutral-light)]">
        <Breadcrumb
          categoryName={producto.categoryName || ""}
          categoryId={producto.categoriaId}
          subcategoryName={producto.subcategoryName || ""}
          productName={producto.nombre || ""}
        />

        <div className="w-full my-10 rounded overflow-hidden">
          <div className="flex flex-col items-center md:flex-row">
            {producto.imagen ? (
              <Image
                isZoomed
                src={producto.imagen}
                alt={producto.nombre}
                className="rounded-t-md object-cover w-screen"
              />
            ) : (
              <div className="w-screen h-64 bg-gray-200 flex items-center justify-center">
                Cargando imagen...
              </div>
            )}
            <div className="flex flex-col justify-between p-12 leading-normal w-screen">
              <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {producto.nombre}
              </h1>
              <span className="text-gray-900">
                vendido por:{" "}
                <a href="#" className="text-pink-600 underline mx-4">
                  {producto.marca}
                </a>{" "}
                <Icon name="star" className="text-yellow-500" />
                <Icon name="star" className="text-yellow-500" />
                <Icon name="star" className="text-yellow-500" />
                <Icon name="star" className="text-yellow-500" />
                <Icon name="star" className="text-gray-300" /> (4,0)
              </span>
              <div className="mt-8">
                <h3 className="text-gray-800 font-bold">
                  ENVÍOS PARA A TODO CHILE
                </h3>
                <p className="text-gray-800 mt-4">
                  Este producto está disponible para ventas al mayor
                </p>
              </div>
              <div className="mt-8 flex flex-col md:flex-row items-center">
                <p className="text-gray-800 font-epilogue text-2xl">
                  Precio:{" "}
                  <span className="text-rose-500 font-epilogue text-2xl">
                    ${producto.precio}
                  </span>
                </p>
                <Button
                  onPress={handleAddToCart}
                  disabled={!user || cartStatus !== "idle"}
                  className={`
                    ml-0 md:ml-8 rounded-full 
                    ${user
                      ? "bg-rose-500 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"}
                    w-full md:w-auto
                    px-2 py-1 sm:px-4 sm:py-2
                    text-xs sm:text-sm md:text-base
                  `}
                >
                  {!user ? (
                    "Debes iniciar sesión para añadir al carrito"
                  ) : cartStatus === "idle" ? (
                    <>
                      Agregar al carrito
                      <Icon name="cart" className="ml-1" />
                    </>
                  ) : cartStatus === "loading" ? (
                    <Spinner size="sm" />
                  ) : cartStatus === "success" ? (
                    <>
                      <Icon name="check" />
                      <span className="ml-1">Producto agregado</span>
                    </>
                  ) : null}
                </Button>
              </div>
              <div className="flex space-x-4 mt-8">
                <Popover showArrow offset={20} placement="bottom">
                  <PopoverTrigger className="size-40 bg-blue-800 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full">
                    <Button className="text-xs sm:text-sm md:text-base">
                      Información
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-sm font-bold">Disponibilidad</div>
                      <div className="text-sm">{producto.descripcion}</div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover showArrow offset={20} placement="bottom">
                  <PopoverTrigger className="size-40 bg-fuchsia-700 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full">
                    <Button className="text-xs sm:text-sm md:text-base">
                      Disponibilidad: {producto.cantidad}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-sm font-bold">Disponibilidad</div>
                      <div className="text-sm">
                        {producto.cantidad} en Stock
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  onPress={() => setShowComments(!showComments)}
                  className="size-40 bg-fuchsia-700 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full text-xs sm:text-sm md:text-base"
                >
                  Comentarios
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Comments visible={showComments} product_id={id} />
      <FeaturedProducts />
      <NewProducts />
    </>
  );
};

export default ProductDetail;
