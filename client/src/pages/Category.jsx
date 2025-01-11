import { useParams } from 'react-router-dom';

const Category = () => {
    const { name } = useParams();

    return (
        <div className="category-page">
            <h1>Categoría: {name}</h1>
            {/* Aquí cargaremos los productos de cada categoria */}
        </div>
    );
};

export default Category;
