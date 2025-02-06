import { useContext, useEffect, useState } from "react";
import { RadioGroup, Radio, Button } from "@nextui-org/react";
import CartContext from "../context/CartContext";

function ShoppingCart() {
  const { cart, increaseQuantity, decreaseQuantity, calculateTotal } = useContext(CartContext);
  const [selectedEnvio, setSelectedEnvio] = useState("tienda");

  // Calcular el costo adicional de envío
  const calculateShipping = (selectedMethod) => {
    switch (selectedMethod) {
      case "starken":
        return 4.99;
      case "express":
        return 7.99;
      default:
        return 0;
    }
  };

  const seleccionarEnvio = (event) => {
    setSelectedEnvio(event.target.value);
  };

  useEffect(() => {
    if (cart.length === 0) {
      setSelectedEnvio("tienda");
    }
  }, [cart]);

  const subtotal = calculateTotal();
  const shippingCost = calculateShipping(selectedEnvio);
  const total = subtotal + shippingCost;

  return (
    <section className="p-6 bg-[var(--color-neutral-light)]">
      <div className="p-4">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">1</div>
            <div className="w-16 h-1 bg-rose-500"></div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-rose-500 text-white flex items-center justify-center rounded-full">2</div>
            <div className="w-16 h-1 bg-rose-500"></div>
          </div>
          <div className="w-8 h-8 bg-rose-500 text-white flex items-center justify-center rounded-full">3</div>
        </div>

        {/* Sección inferior con dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="p-4">
            <h3 className="text-gray-800 text-3xl font-normal mb-4">Detalle de tu compra</h3>
            <ul className="space-y-4">
              {cart.map((producto, index) => (
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
                    <h4 className="text-lg font-bold text-gray-800">{producto.name_product}</h4>
                    <p className="text-sm text-gray-500">Vendido por Petcos SPA</p>
                  </div>

                  {/* Derecha: Precio y controles de cantidad */}
                  <div className="text-center md:text-right">
                    <p className="text-rose-500 font-epilogue text-2xl">${producto.price.toFixed(2)}</p>
                    <div className="flex items-center justify-center md:justify-end mt-2 space-x-2">
                      <button
                        onClick={() => increaseQuantity(index)}
                        className="w-8 h-8 flex items-center justify-center text-gray-900 focus:outline-none bg-white rounded-lg text-2xl font-medium"
                      >
                        +
                      </button>
                      <span className="text-2xl text-gray-900 font-medium">{producto.cartQuantity}</span>
                      <button
                        onClick={() => decreaseQuantity(index)}
                        className="w-8 h-8 flex items-center justify-center text-gray-900 focus:outline-none bg-white rounded-lg text-2xl font-medium"
                      >
                        −
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna derecha */}
          <div className="p-4 bg-white rounded-lg shadow w-full lg:w-8/12 mx-auto lg:mx-0">
            <h3 className="text-gray-800 text-2xl font-normal mb-4 text-center">Total carrito</h3>
            <div className="mb-2">
              <hr className="my-4" />
              <p className="flex justify-center text-gray-800">
                <span className="mx-8">Subtotal:</span>
                <span className="mx-8">${subtotal.toFixed(2)}</span>
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col space-y-2 text-gray-800">
              <RadioGroup
                color="primary"
                defaultValue="tienda"
                label="Formas de envío:"
                value={selectedEnvio}
                onChange={seleccionarEnvio}
                isDisabled={cart.length === 0}
              >
                <Radio value="starken">Starken</Radio>
                <Radio value="express">Chile Express</Radio>
                <Radio value="tienda">Buscar en tienda</Radio>
              </RadioGroup>
            </div>
            <div className="my-8">
              <p className="flex justify-between font-bold text-3xl text-gray-800">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </p>
              <p className="text-gray-400 italic">{selectedEnvio !== "tienda" ? "(subtotal + envío)" : ""}</p>
            </div>

            <Button
              className="w-full bg-rose-500 text-[var(--color-neutral-light)] hover:bg-[var(--color-primary)] hover:text-white rounded-full disabled:bg-gray-300"
              disabled={cart.length === 0}
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShoppingCart;
