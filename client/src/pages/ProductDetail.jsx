//import SiteUnderConstruction from "./SiteUnderConstruction.jsx";

import { useParams } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts";
import NewProducts from "../components/NewProducts";
import dataProductos from "../data/dataProductos.json";

import { Button, Image } from "@nextui-org/react";
import Icon from "../components/Icons";

const ProductDetail = () => {
  const { id } = useParams();

  const producto = dataProductos.find(
    (producto) => producto.id === parseInt(id)
  );
  /* la linea de arriba se reemplaza por el fetch de llamada a la API */

  return (
    <>
      <section className="p-6 bg-[var(--color-neutral-light)]">
        <p className="text-neutral-dark text-xs my-4">
          Home {">"} Escolar {">"} Lápices y accesorios {">"} Lápices de colores
          Artel
        </p>
        <div className="text-2xl font-bold font-oswald text-[var(--color-primary-light)] my-4">
          CATEGORÍA ESCOLAR / LAPICES Y ACCESORIOS / LÁPICES DE COLORES ARTEL{" "}
        </div>

        <div className="w-full my-10 rounded overflow-hidden">
          <div className="flex flex-col items-center md:flex-row">
            <Image
              isZoomed
              src={producto.imagen}
              alt={producto.nombre}
              width="100%"
              className="rounded-t-md w-full object-cover"
            />
            <div className="flex flex-col justify-between p-12 leading-normal">
              <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {producto.nombre}
              </h1>
              <span className="text-gray-900">
                vendido por:{" "}
                <a href="#" className="text-pink-600 underline mx-4">
                  petcos spa
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
                <Button className="ml-8 size-80 bg-rose-500 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full">
                  Agregar al carrito
                  <Icon name="cart" className="ml-1" />
                </Button>
              </div>
              <div className="flex space-x-4 mt-8">
                <Button className="size-40 bg-blue-800 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full">
                  Información
                </Button>
                <Button className="size-40 bg-fuchsia-700 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full">
                  Disponibilidad
                </Button>
                <Button className="size-40 bg-fuchsia-700 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full">
                  Comentarios
                </Button>
              </div>
              <p className="mt-8 font-normal text-gray-900">
                {producto.descripcion}
              </p>
            </div>
          </div>
        </div>
      </section>
      <FeaturedProducts />
      <NewProducts />
    </>
  );
};

export default ProductDetail;
