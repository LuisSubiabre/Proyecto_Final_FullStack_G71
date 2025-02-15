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
  Alert,
} from "@nextui-org/react";
import Icon from "../components/Icons";
import { useContext, useEffect, useState } from "react";
import Comments from "../components/Comments.jsx";
import { getProductById } from "../service/productService.js";

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const { addToCart } = useContext(CartContext);
  const [showAlert, setShowAlert] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    getProductoDetalle(id);
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      product_id: producto.id,
      name_product: producto.nombre,
      price: producto.precio,
      image_url: producto.imagen,
    });
    disminuirCantidad();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
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
        imagen: data.image_url,
      });
    } catch (error) {
      console.error("Error al cargar el producto", error);
    }
  };

  return (
    <>
      <section className="p-6 bg-[var(--color-neutral-light)]">
        <p className="text-neutral-dark text-xs my-4">
          Home {">"} Escolar {">"} Lápices y accesorios {">"} Lápices de colores
          Artel
        </p>
        <div className="text-2xl font-bold font-oswald text-[var(--color-primary-light)] my-4">
          CATEGORÍA ESCOLAR / LAPICES Y ACCESORIOS / LÁPICES DE COLORES ARTEL
        </div>

        <div className="w-full my-10 rounded overflow-hidden">
          <div className="flex flex-col items-center md:flex-row">
            {/* Usamos un condicional para asegurarnos que la imagen exista */}
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
                  Este producto esta disponible para ventas al mayor
                </p>
              </div>
              <div className="mt-8 flex items-center">
                <p className="text-gray-800 font-epilogue text-2xl">
                  Precio:{" "}
                  <span className="text-rose-500 font-epilogue text-2xl">
                    ${producto.precio}
                  </span>
                </p>
                <Button
                  onPress={handleAddToCart}
                  className="ml-8 size-80 bg-rose-500 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full"
                >
                  Agregar al carrito
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
              </div>
              <div className="flex space-x-4 mt-8">
                <Popover showArrow offset={20} placement="bottom">
                  <PopoverTrigger className="size-40 bg-blue-800 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full">
                    <Button>Información</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">Disponibilidad</div>
                      <div className="text-tiny">{producto.descripcion}</div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover showArrow offset={20} placement="bottom">
                  <PopoverTrigger className="size-40 bg-fuchsia-700 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full">
                    <Button>Disponibilidad: {producto.cantidad}</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">Disponibilidad</div>
                      <div className="text-tiny">
                        {producto.cantidad} en Stock
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  onPress={() => setShowComments(!showComments)}
                  className="size-40 bg-fuchsia-700 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full"
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
