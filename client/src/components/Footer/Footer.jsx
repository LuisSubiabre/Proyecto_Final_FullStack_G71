import { Link } from "react-router-dom";
import Icon from "../Icons.jsx";
import dataFooter from "../../data/dataFooter.json";

export default function Footer() {
    return (
        <footer className="w-full bg-[--color-primary-dark] text-white">
            <div className='bg-[url("https://res.cloudinary.com/dxxrdckad/image/upload/v1729796934/fondo_producto_destacado_cbu2jz.jpg")] h-2 sm:h-4 md:h-5 lg:h-6'></div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
                {dataFooter.footerData.columns.map((column) => (
                    <div key={column.id} className="flex flex-col gap-2 items-start sm:items-center">
                        <h3 className="font-bold !tex-oswald text-lg mb-2">{column.title}</h3>
                        {column.id === "social-media" ? (
                            <div className="flex justify-center gap-4 mt-4">
                                {column.content.map((item) => (
                                    <Link
                                        key={item.id}
                                        to="/sitio-en-construccion"
                                        className="flex items-center justify-center w-16 h-16 bg-white text-[--color-primary-dark] rounded-full shadow-md hover:bg-[--color-secondary-light] hover:text-white transition"
                                    >
                                        <Icon name={item.name} className="text-[45px]" />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <ul className="list-disc pl-5">
                                {column.content.map((item) => (
                                    <li key={item.id} className="mb-1 !font-arvo text-[13px]">
                                        <Link to="/sitio-en-construccion">
                                            {item.name && <Icon name={item.name} className="mr-2" />}
                                            {item.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {column.id === "about" && (
                            <div className="mt-4">
                                <img
                                    src="https://res.cloudinary.com/dxxrdckad/image/upload/v1727986358/logo_sin_fondo_o6f8m0.png"
                                    alt="Logo Librería es un ave con texto"
                                    className="w-60 h-30"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="text-center text-[20px] font-epilogue font-bold italic p-2 border-t-2 border-[--color-secondary-light]">
                <p>© 2025 Librería Alas de Alondra, Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
