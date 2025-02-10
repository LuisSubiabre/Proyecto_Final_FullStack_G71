export const formatPrice = (price) => {
    if (price === null || price === undefined) {
        console.error("El precio es nulo o indefinido");
        return "0";
    }

    if (typeof price === 'string') {
        // Convertir la cadena a número
        price = parseFloat(price.replace(',', '.'));
    }

    if (isNaN(price)) {
        console.error("El precio no es un número válido:", price);
        return "0";
    }

    // Convertir a string y agregar puntos de miles manualmente
    return Math.round(price)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
