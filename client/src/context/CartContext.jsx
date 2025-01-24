// Importaciones necesarias
import { createContext, useState, useMemo, useCallback } from 'react';
import dataProductsCategories from '../data/dataProductsCategories.json';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Productos simulados desde el archivo JSON
    const products = dataProductsCategories;

    const addToCart = useCallback((product) => {
        setCart((prevCart) => {
            const productIndex = prevCart.findIndex(item => item.id === product.id);
            if (productIndex !== -1) {
                const newCart = [...prevCart];
                newCart[productIndex].quantity += 1;
                return newCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    }, []);

    const increaseQuantity = useCallback((index) => {
        setCart((prevCart) => {
            const newCart = [...prevCart];
            newCart[index].quantity += 1;
            return newCart;
        });
    }, []);

    const decreaseQuantity = useCallback((index) => {
        setCart((prevCart) => {
            const newCart = [...prevCart];
            if (newCart[index].quantity > 1) {
                newCart[index].quantity -= 1;
            } else {
                newCart.splice(index, 1);
            }
            return newCart;
        });
    }, []);

    const calculateTotal = useCallback(() => {
        return cart.reduce((total, product) => total + product.precio * product.quantity, 0);
    }, [cart]);

    const getTotalQuantity = useCallback(() => {
        return cart.reduce((total, product) => total + product.quantity, 0);
    }, [cart]);

    const value = useMemo(() => ({
        cart,
        products,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotal,
        getTotalQuantity, // Incluye esta función en el valor del contexto
    }), [cart, products, addToCart, increaseQuantity, decreaseQuantity, calculateTotal, getTotalQuantity]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
