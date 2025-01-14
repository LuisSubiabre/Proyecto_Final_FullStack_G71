import { Card, Button } from "@nextui-org/react";

const SiteUnderConstruction = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="p-6 text-center">
                <h2 className="text-primary text-2xl font-bold mb-4">
                    🚧 Sitio en Construcción 🚧
                </h2>
                <p className="text-gray-600 mb-6">
                    Estamos trabajando duro para traerte algo increíble. ¡Vuelve pronto!
                </p>
                <Button color="primary" auto>
                    Contáctanos
                </Button>
            </Card>
        </div>
    );
};

export default SiteUnderConstruction;

