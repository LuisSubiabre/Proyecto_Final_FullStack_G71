import { useContext, useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import CartContext from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import regions from "../data/regions.json"; // Importa el archivo JSON
import { closeCartByUser } from "../service/cartService";
import { AuthContext } from "../context/authContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

function ShoppingCartStep2() {
  const { cart, setCart, calculateTotal } = useContext(CartContext);
  const location = useLocation();
  const { total, isRetiroEnLocal } = location.state || {
    total: 0,
    isRetiroEnLocal: false,
  };
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedComuna, setSelectedComuna] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [comunas, setComunas] = useState([]);
  const [direccion, setDireccion] = useState("");
  const subtotal = calculateTotal();
  const { userId } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedRegion) {
      const regionData = regions.find(
        (region) => region.region === selectedRegion
      );
      setComunas(regionData ? regionData.comunas : []);
    } else {
      setComunas([]);
    }
    setSelectedComuna(""); // Resetear comuna al cambiar región
  }, [selectedRegion]);

  const isFormComplete = () => {
    if (isRetiroEnLocal) {
      return metodoPago !== ""; // Solo método de pago es requerido
    } else {
      return (
        selectedRegion &&
        selectedComuna &&
        direccion.trim() !== "" &&
        metodoPago !== ""
      ); // Todos los campos son requeridos
    }
  };

  const finalizar = async (e) => {
    e.preventDefault();

    console.log(userId);
    if (userId) {
      try {
        const response = await closeCartByUser(userId);
        if (response.success) {
          if (isRetiroEnLocal) {
            setMessage(`Compra realizada con éxito.
      Total: ${total},
      Método de pago: ${metodoPago}`);
          } else {
            setMessage(`Compra realizada con éxito.
      Total: ${total},
      Subtotal: ${subtotal},
      Retiro en local: ${isRetiroEnLocal},
      Región: ${selectedRegion},
      Comuna: ${selectedComuna},
      Dirección: ${direccion},
      Método de pago: ${metodoPago}`);
          }

          onOpen();
          setCart([]); // Vaciar el carrito
        } else {
          setError("Error al procesar la compra en el servidor.");
          onOpen();
        }
      } catch (error) {
        setError("Error al conectar con el servidor." + error);
        onOpen();
      }
    } else {
      setError("Error al procesar la compra.");
      onOpen();
    }
  };

  return (
    <>
      <section className="p-6 bg-[var(--color-neutral-light)]">
        <div className="p-4">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
                1
              </div>
              <div className="w-16 h-1 bg-blue-500"></div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
                2
              </div>
              <div className="w-16 h-1 bg-rose-500"></div>
            </div>
            <div className="w-8 h-8 bg-rose-500 text-white flex items-center justify-center rounded-full">
              3
            </div>
          </div>

          {/* Sección inferior con dos columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <div className="p-4">
              <h3 className="text-gray-800 text-3xl font-normal mb-4">
                Detalle de tu compra
              </h3>
              <ul className="space-y-4">
                {cart.map((producto) => (
                  <li
                    className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow"
                    key={producto.product_id}
                  >
                    {/* Izquierda: Imagen del producto */}
                    <img
                      src={producto.image_url}
                      alt={producto.name_product}
                      className="w-16 h-16 object-cover rounded mb-4 md:mb-0"
                    />

                    {/* Centro: Nombre del producto y texto adicional */}
                    <div className="flex-1 px-4 text-center md:text-left">
                      <h4 className="text-lg font-bold text-gray-800">
                        {producto.name_product}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Vendido por Petcos SPA
                      </p>
                    </div>

                    {/* Derecha: Precio y controles de cantidad */}
                    <div className="text-center md:text-right">
                      <p className="text-rose-500 font-epilogue text-2xl">
                        ${producto.price.toFixed(0)}
                      </p>
                      <div className="flex items-center justify-center md:justify-end mt-2 space-x-2">
                        <span className="text-2xl text-gray-900 font-medium">
                          Cantidad: {producto.cartQuantity}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg shadow w-full lg:w-8/12 mx-auto lg:mx-0">
              <h3 className="text-gray-800 text-2xl font-normal mb-4 text-center">
                Total carrito
              </h3>
              <div className="mb-2">
                <hr className="my-4" />
              </div>
              <hr className="my-4" />
              <div className="flex flex-col space-y-2 text-gray-800">
                <p className="flex justify-center mx-8 text-2xl font-epilogue">
                  {isRetiroEnLocal
                    ? `Total: $${total.toFixed(0)}`
                    : `Total + envío: $${total.toFixed(0)}`}
                </p>
                <p className="flex justify-center text-gray-800">
                  <span className="mx-8">Subtotal:</span>
                  <span className="mx-8">${subtotal.toFixed(0)}</span>
                </p>
              </div>

              {/* Mostrar solo método de pago si es retiro en local */}
              {isRetiroEnLocal ? (
                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="metodoPago"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Método de Pago
                    </label>
                    <select
                      id="metodoPago"
                      name="metodoPago"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      onChange={(e) => setMetodoPago(e.target.value)}
                      value={metodoPago}
                    >
                      <option value="">Selecciona un método de pago</option>
                      <option value="tarjetaCredito">Tarjeta de Crédito</option>
                      <option value="tarjetaDebito">Tarjeta de Débito</option>
                      <option value="transferencia">
                        Transferencia Bancaria
                      </option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Región
                    </label>
                    <select
                      id="region"
                      name="region"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                      <option value="">Selecciona una región</option>
                      {regions.map((region) => (
                        <option key={region.region} value={region.region}>
                          {region.region}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="comuna"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Comuna
                    </label>
                    <select
                      id="comuna"
                      name="comuna"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      value={selectedComuna}
                      onChange={(e) => setSelectedComuna(e.target.value)}
                      disabled={!selectedRegion}
                    >
                      <option value="">Selecciona una comuna</option>
                      {comunas.map((comuna) => (
                        <option key={comuna} value={comuna}>
                          {comuna}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label
                    htmlFor="direccion"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Dirección de envío
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Ingresa tu dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />

                  <div>
                    <label
                      htmlFor="metodoPago"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Método de Pago
                    </label>
                    <select
                      id="metodoPago"
                      name="metodoPago"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      onChange={(e) => setMetodoPago(e.target.value)}
                      value={metodoPago}
                    >
                      <option value="">Selecciona un método de pago</option>
                      <option value="tarjetaCredito">Tarjeta de Crédito</option>
                      <option value="tarjetaDebito">Tarjeta de Débito</option>
                      <option value="transferencia">
                        Transferencia Bancaria
                      </option>
                    </select>
                  </div>
                </div>
              )}

              <Button
                className="w-full bg-rose-500 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full disabled:bg-gray-300 mt-4"
                disabled={!isFormComplete() || cart.length === 0}
                onPress={() => finalizar(event)}
              >
                Finalizar Compra
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          navigate("/");
        }}
      >
        <ModalContent>
          <ModalHeader>{error ? "Error" : "Éxito"}</ModalHeader>
          <ModalBody>
            <p>{error || message}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => {
                onClose();
                navigate("/");
              }}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ShoppingCartStep2;
