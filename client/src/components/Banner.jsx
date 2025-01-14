import { useState } from 'react';

const Banner = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="bg-background-light text-center py-1 relative animate-slide-in-horizontal">
            <p className="text-neutral-dark font-bold !text-oswald animate-text-color-change text-xs">
                ENVÍO A TODO CHILE GRATIS!! CON COMPRAS SUPERIORES A 15.000 CLP
            </p>
            <button
                onClick={handleClose}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-dark font-bold"
            >
                X
            </button>
        </div>
    );
};

export default Banner;

