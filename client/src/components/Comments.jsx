import { useEffect, useState } from "react";

const Comments = ({ visible, product_id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (visible && product_id) {
      fetchComments(product_id);
    }
  }, [product_id, visible]);

  const fetchComments = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/reviews/product/${id}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los comentarios");
      }
      const { data } = await response.json();
      setComments(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(isoDate).toLocaleDateString("es-ES", options);
  };

  return (
    <>
      {visible && (
        <section className="bg-white dark:bg-gray-200 py-8 lg:py-16 antialiased">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                Comentarios ({comments.length})
              </h2>
            </div>

            {loading && (
              <p className="text-gray-500">Cargando comentarios...</p>
            )}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && comments.length === 0 && (
              <p className="text-gray-500">No hay comentarios aún.</p>
            )}

            {/* Formulario para agregar comentarios */}
            <form className="mb-6">
              <div className="py-2 px-4 mb-4 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label htmlFor="comment" className="sr-only">
                  Tu comentario
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Escribe un comentario..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="py-2.5 px-4 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Publicar comentario
              </button>
            </form>

            {/* Lista de comentarios */}
            {comments.map((comment) => (
              <article
                key={comment.review_id}
                className="p-6 text-base bg-white rounded-lg shadow mb-4"
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm font-semibold text-gray-900 dark:text-white">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://i.pravatar.cc/40?img=5"
                        alt={comment.username}
                      />
                      <span className="text-gray-600">{comment.username}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time dateTime={comment.create_at}>
                        {formatDate(comment.create_at)}
                      </time>
                    </p>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {comment.comment}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Comments;
