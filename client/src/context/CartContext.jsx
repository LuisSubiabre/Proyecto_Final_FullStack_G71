import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import {
  // getCartsByUser,
  addCartItem,
  getCarritoGuardado,
  addCart,
  getCartsByCartID,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  eliminarItemCarrito,
} from "../service/cartService";
import useAuth from "../hook/useAuth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userId } = useAuth();
  const [cart, setCart] = useState([]);

  // Cargar el carrito del usuario al montar el contexto
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (userId) {
          // Consultar si el usuario tiene un carrito activo
          const cart_id = await consultaCarroActivo();
          if (!cart_id) {
            console.error("No se pudo obtener el carrito activo");
            return;
          }

          // Obtener los productos del carrito activo usando el endpoint
          // const response = await getCartsByUser(userId); // Usa el endpoint correcto
          const response = await getCartsByCartID(cart_id);
          console.log("response:", response);
          if (response.success) {
            const cartItemsWithDetails = response.data.map((item) => ({
              product_id: item.product_id,
              cart_id: item.cart_id,
              detail_id: item.detail_id,
              name_product: item.name_product,
              image_url: item.image_url,
              quantity: item.quantity,
              price: parseFloat(item.price) || 0,
              cartQuantity: item.quantity, // Usamos la cantidad del carrito
              created_at: item.created_at,
            }));

            setCart(cartItemsWithDetails);
          } else {
            console.error("Error al obtener el carrito:", response.message);
          }
        }
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
      }
    };

    fetchCart();
  }, [userId]);

  /* consulta si existe carrito activo al backend*/
  const consultaCarroActivo = useCallback(async () => {
    try {
      /*consulta si el usuario tiene un carrito activo*/
      const cartInfo = await getCarritoGuardado(userId);

      // Si no existe carrito, crea un carrito nuevo
      if (!cartInfo) {
        const newCart = await addCart(userId);
        return newCart.cart_id; // Devuelve el ID del nuevo carrito
      } else {
        // Si existe carrito, regresa el id del carrito activo
        return cartInfo.cart_id;
      }
    } catch (error) {
      console.error("Error al consultar el carrito activo:", error);
      return null;
    }
  }, [userId]);

  // Agregar un producto al carrito
  const addToCart = useCallback(
    async (product) => {
      if (!userId) {
        console.error("El usuario no está autenticado");
        return;
      }

      try {
        // Obtener el cart_id del carrito activo
        const cart_id = await consultaCarroActivo();
        if (!cart_id) {
          console.error("Error al consultar el carrito activo");
          return;
        }

        // Datos para enviar al backend
        const cartItemData = {
          product_id: product.product_id,
          user_id: userId,
          cart_id: cart_id,
          quantity: 1, // Cantidad a agregar (puedes ajustar esto según tu lógica)
        };

        // Enviar la información al backend
        const response = await addCartItem(cartItemData);

        // Verificar si el producto ya existe en el carrito
        const existingProductIndex = cart.findIndex(
          (item) => item.product_id === product.product_id
        );

        if (existingProductIndex !== -1) {
          // Si el producto ya existe, actualizar la cantidad en el estado `cart`
          const updatedCart = [...cart];
          updatedCart[existingProductIndex].cartQuantity += 1;
          setCart(updatedCart);
        } else {
          // Si el producto no existe, agregarlo al estado `cart`
          setCart((prevCart) => [
            ...prevCart,
            {
              ...response, // Respuesta del backend
              ...product,
              price: parseFloat(product.price) || 0,
              cartQuantity: 1,
            },
          ]);
        }
      } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
      }
    },
    [userId, cart, consultaCarroActivo] // Agrega cart como dependencia
  );

  // Incrementar la cantidad de un producto en el carrito (solo en cliente)
  const increaseQuantity = useCallback(
    async (index) => {
      try {
        const response = await increaseCartItemQuantity({
          detail_id: cart[index].detail_id,
          quantity: cart[index].cartQuantity + 1,
        });
        console.log("response:", response);

        setCart((prevCart) => {
          const newCart = [...prevCart];
          newCart[index].cartQuantity += 1;
          return newCart;
        });
      } catch (error) {
        console.error("Error al incrementar la cantidad del producto:", error);
      }
    },
    [cart]
  );

  // Disminuir la cantidad de un producto en el carrito (solo en cliente)
  const decreaseQuantity = useCallback(
    async (index) => {
      /* si la cantidad llega a 0, eliminar el item del carrito */
      if (cart[index].cartQuantity <= 1) {
        await eliminarItemCarrito(cart[index].detail_id);
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
      } else {
        /* si la cantidad es mayor a 1, decrementar la cantidad */
        await decreaseCartItemQuantity({
          detail_id: cart[index].detail_id,
          quantity: cart[index].cartQuantity - 1,
        });
        setCart((prevCart) => {
          const newCart = [...prevCart];
          newCart[index].cartQuantity -= 1;
          return newCart;
        });
      }
    },
    [cart]
  );

  // Calcular el total del carrito
  const calculateTotal = useCallback(() => {
    return cart.reduce((total, product) => {
      const price = parseFloat(product.price) || 0;
      const quantity = product.cartQuantity || 0;
      return total + price * quantity;
    }, 0);
  }, [cart]);

  // Obtener el total de productos en el carrito
  const getTotalQuantity = useCallback(() => {
    return cart.reduce((total, product) => total + product.cartQuantity, 0);
  }, [cart]);

  // Valor del contexto
  const value = useMemo(
    () => ({
      cart,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      calculateTotal,
      getTotalQuantity,
    }),
    [
      cart,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      calculateTotal,
      getTotalQuantity,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
