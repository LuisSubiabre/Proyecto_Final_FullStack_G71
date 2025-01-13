import { useState } from "react";
import { Alert } from "@nextui-org/react";

const NotificationBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={{ position: "fixed", width: "100%", top: 0, zIndex: 1000 }}>
            <Alert
                color="primary"
                title="Envío Gratis a Todo Chile!"
                description="¡Con compras superiores a 15.000 CLP! Aprovecha la oferta ahora."
                onClose={handleClose}
                dismissible
                isVisible={isVisible}
            />
        </div>
    );
};

export default NotificationBanner;
