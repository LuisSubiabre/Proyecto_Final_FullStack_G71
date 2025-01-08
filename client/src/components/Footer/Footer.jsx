import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full py-6 bg-gray-900 text-white">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <p className="text-sm">&copy; 2025 Marketplace. Todos los derechos reservados.</p>
                </div>

                <div className="flex space-x-4">
                    <Link to="/" className="hover:text-primary">Inicio</Link>
                    <Link to="/login" className="hover:text-primary">Iniciar Sesión</Link>
                    <Link to="/register" className="hover:text-primary">Registrarse</Link>
                    <Link to="/about" className="hover:text-primary">Nosotros</Link>
                </div>
            </div>
        </footer>
    );
}
