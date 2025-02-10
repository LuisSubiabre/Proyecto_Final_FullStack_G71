import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="group flex items-center w-full max-w-sm md:max-w-md lg:max-w-lg rounded-md overflow-hidden shadow-md hover:shadow-lg hover:ring-2 hover:ring-[var(--color-secondary)] transition-all">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Aquí encontrarás lo que buscas"
                className="flex-1 p-2.5 text-sm bg-white text-gray-700 placeholder-gray-400 border-none focus:outline-none"
            />
            <button
                onClick={handleSearch}
                className="bg-[var(--color-secondary-dark)] text-white flex items-center justify-center p-3 hover:bg-[var(--color-secondary)] transition-all"
                aria-label="Buscar"
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
};

export default SearchBar;




