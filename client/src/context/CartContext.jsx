import { createContext, useState, useMemo, useCallback, useEffect } from 'react';
import { getCartsByUser, addCartItem } from '../service/cartService';
import { getProductById } from '../service/productService';
import useAuth from '../hook/useAuth';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { userId } = useAuth();
    const [cart, setCart] = useState([]);

    // Cargar el carrito del usuario al montar el contexto
    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (userId) {
                    const cartData = await getCartsByUser(userId);
                    const cartItemsWithDetails = await Promise.all(
                        cartData.items.map(async (item) => {
                            const productDetails = await getProductById(item.product_id);
                            return {
                                ...item,
                                ...productDetails.data,
                                price: parseFloat(productDetails.data.price) || 0,
                                cartQuantity: item.quantity,
                            };
                        })
                    );
                    setCart(cartItemsWithDetails);
                }
            } catch (error) {
                console.error('Error al cargar el carrito:', error);
            }
        };
        fetchCart();
    }, [userId]);

    // Agregar un producto al carrito
    const addToCart = useCallback(async (product) => {
        try {
            const cartItemData = {
                product_id: product.product_id,
                quantity: 1,
            };
            const newItem = await addCartItem(cartItemData);
            setCart((prevCart) => [
                ...prevCart,
                { ...newItem, ...product, price: parseFloat(product.price) || 0, cartQuantity: 1 }
            ]);
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    }, []);

    // Incrementar la cantidad de un producto en el carrito (solo en cliente)
    const increaseQuantity = useCallback((index) => {
        setCart((prevCart) => {
            const newCart = [...prevCart];
            newCart[index].cartQuantity += 1;
            return newCart;
        });
    }, []);

    // Disminuir la cantidad de un producto en el carrito (solo en cliente)
    const decreaseQuantity = useCallback((index) => {
        setCart((prevCart) => {
            const newCart = [...prevCart];
            if (newCart[index].cartQuantity > 1) {
                newCart[index].cartQuantity -= 1;
            } else {
                newCart.splice(index, 1);  // Eliminar el ítem si la cantidad llega a 0
            }
            return newCart;
        });
    }, []);

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
    const value = useMemo(() => ({
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotal,
        getTotalQuantity,
    }), [cart, addToCart, increaseQuantity, decreaseQuantity, calculateTotal, getTotalQuantity]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;