import { Accordion, AccordionItem } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { getAllCartsByUser } from "../service/cartService";
import { AuthContext } from "../context/authContext";

const MyPurchases = () => {
  const { userId } = useContext(AuthContext);
  const [carritos, setCarritos] = useState([]);

  const allCart = async () => {
    try {
      const response = await getAllCartsByUser(userId);
      console.log("Respuesta de getAllCartsByUser:", response); // 🔍 Verifica la respuesta en consola

      const groupedCarts = response.data.reduce((acc, item) => {
        if (!acc[item.cart_id]) {
          acc[item.cart_id] = {
            cart_id: item.cart_id,
            products: [],
          };
        }
        acc[item.cart_id].products.push({
          name_product: item.name_product,
          quantity: item.quantity,
          price: item.price,
        });

        return acc;
      }, {});

      setCarritos(Object.values(groupedCarts)); // Convierte el objeto en un array
    } catch (error) {
      console.error("Error al obtener los carritos:", error);
      setCarritos([]); // Evita errores si la API falla
    }
  };

  useEffect(() => {
    allCart();
  }, []);

  return (
    <>
      <section className="p-6 bg-[var(--color-neutral-light)]">
        <div className="p-4">
          <h3 className="text-gray-800 text-3xl font-normal mb-4">
            Tus compras
          </h3>
          <div className="bg-purple-900">
            <Accordion>
              {carritos.map((cart) => (
                <AccordionItem
                  key={cart.cart_id}
                  title={`Orden Número: ${cart.cart_id}`}
                >
                  <ul className="space-y-2">
                    {cart.products.map((product, index) => (
                      <li key={index} className="border-b py-2">
                        <p>
                          <strong>Producto:</strong> {product.name_product}
                        </p>
                        <p>
                          <strong>Cantidad:</strong> {product.quantity}
                        </p>
                        <p>
                          <strong>Precio:</strong> ${product.price}
                        </p>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyPurchases;
