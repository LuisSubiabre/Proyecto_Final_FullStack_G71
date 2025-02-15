import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import {
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

  // Función para obtener el carrito desde el backend
  const fetchCart = useCallback(async () => {
    try {
      if (userId) {
        const cart_id = await consultaCarroActivo();
        if (!cart_id) {
          console.error("No se pudo obtener el carrito activo");
          return;
        }

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
            cartQuantity: item.quantity,
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
  }, [userId]);

  // Cargar el carrito al montar el contexto
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Consultar si existe un carrito activo
  const consultaCarroActivo = useCallback(async () => {
    try {
      const cartInfo = await getCarritoGuardado(userId);
      if (!cartInfo) {
        const newCart = await addCart(userId);
        return newCart.cart_id;
      } else {
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
        const cart_id = await consultaCarroActivo();
        if (!cart_id) {
          console.error("Error al consultar el carrito activo");
          return;
        }

        const cartItemData = {
          product_id: product.product_id,
          user_id: userId,
          cart_id: cart_id,
          quantity: 1,
        };

        await addCartItem(cartItemData);
        await fetchCart(); // Actualizar el carrito desde el backend
      } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
      }
    },
    [userId, consultaCarroActivo, fetchCart]
  );

  // Incrementar la cantidad de un producto en el carrito
  const increaseQuantity = useCallback(
    async (index) => {
      try {
        const detail_id = cart[index].detail_id;
        await increaseCartItemQuantity({
          detail_id,
          quantity: cart[index].cartQuantity + 1,
        });
        await fetchCart(); // Actualizar el carrito desde el backend
      } catch (error) {
        console.error("Error al incrementar la cantidad del producto:", error);
      }
    },
    [cart, fetchCart]
  );

  // Disminuir la cantidad de un producto en el carrito
  const decreaseQuantity = useCallback(
    async (index) => {
      try {
        const detail_id = cart[index].detail_id;
        if (cart[index].cartQuantity <= 1) {
          await eliminarItemCarrito(detail_id);
        } else {
          await decreaseCartItemQuantity({
            detail_id,
            quantity: cart[index].cartQuantity - 1,
          });
        }
        await fetchCart(); // Actualizar el carrito desde el backend
      } catch (error) {
        console.error("Error al disminuir la cantidad del producto:", error);
      }
    },
    [cart, fetchCart]
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

  // Limpiar el carrito cuando el usuario haga logout
  useEffect(() => {
    if (!userId) {
      setCart([]); // Limpiar el carrito
    }
  }, [userId]);

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
