
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
    return (
        <div className="group flex items-center w-full max-w-sm md:max-w-md lg:max-w-lg rounded-md overflow-hidden shadow-md hover:shadow-lg hover:ring-2 hover:ring-[var(--color-secondary)] transition-all">
            <input
                type="text"
                placeholder="Aquí encontrarás lo que buscas"
                className="flex-1 p-2.5 text-sm bg-white text-gray-700 placeholder-gray-400 border-none focus:outline-none"
            />
            <button
                className="bg-[var(--color-secondary-dark)] text-white flex items-center justify-center p-3 hover:bg-[var(--color-secondary)] transition-all"
                aria-label="Buscar"
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
};

export default SearchBar;




