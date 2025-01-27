import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import Icon from "../Icons.jsx";

const FeaturedCard = () => {
    return (
        <Card className="bg-white rounded-lg border-[1.5px] border-[var(--color-primary-dark)] m-2 md:w-[400px] lg:w-[500px] 2xl:w-[600px] font-epilogue shadow-2xl shadow-[--color-primary-light] relative">
            <div className="flex flex-row relative">
                <div className="w-1/3 flex justify-center items-center relative">
                    <img
                        src="https://res.cloudinary.com/dxxrdckad/image/upload/v1736966352/20630010-new-caja-12-lapices-color-largos_c2t2el.jpg"
                        alt="Producto"
                        className="max-w-full h-auto rounded-lg"
                    />
                    <div className="absolute top-2 left-0 bg-[var(--color-highlight)] text-white px-2 py-1 transform -rotate-12 animate-background-flash">
                        <span className="text-sm font-bold animate-pulse-text">Oferta 1.000</span>
                    </div>
                </div>
                <div className="w-2/3">
                    <CardHeader className="pb-[1px] animate-slide-in-horizontal">
                        <h4 className="text-[var(--color-primary-dark)] text-lg text-center font-extrabold">
                            Estuche 12 Lápices De Color Largos Artel
                        </h4>
                    </CardHeader>
                    <CardBody className="text-gray-600 text-sm">
                        <p>
                            Calidad Premium. Mina resistente, colores intensos, mina 2.9 mm.
                            Lápices con forma hexagonal. Colores mezclables entre sí. Permite
                            un trazo suave.
                        </p>
                        <p className="text-gray-500 m-1">
                            <span className="text-blue-500 underline">
                                Escolar, imprescindibles, lápices de color
                            </span>
                        </p>
                    </CardBody>
                    <CardFooter className="flex justify-end">
                        <Link to="/shopping-cart">
                            <Button className="bg-[var(--color-highlight)] text-white hover:bg-[var(--color-primary-dark)] transition w-full sm:w-auto">
                                Agrega al carrito
                                <Icon name="cart" className="ml-2" />
                            </Button>
                        </Link>
                    </CardFooter>
                </div>
            </div>
        </Card>
    );
};

export default FeaturedCard;




