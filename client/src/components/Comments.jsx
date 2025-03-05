import { useEffect, useState } from "react";
import Icon from "./Icons";
import { Alert } from "@nextui-org/react";
import { Link } from "react-router-dom";

const Comments = ({ visible, product_id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("No hay comentarios aún.");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5); // Estado para el rating seleccionado
  const [commetUserId, setCommetUserId] = useState(null);

  // Obtener comentarios al cargar el componente o cuando cambia el product_id
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setCommetUserId(parseInt(storedUserId)); // Convertir a número si es necesario
    }

    if (visible && product_id) {
      fetchComments(product_id);
    }
  }, [product_id, visible]);

  // Función para obtener los comentarios del producto
  const fetchComments = async (id) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_BASE}/reviews/product/${id}`
      );
      if (!response.ok) {
        setError("No hay comentarios aún.");
        return;
      }
      const result = await response.json();

      if (result.success) {
        setComments(result.data);

        setError("");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el usuario esté autenticado
    if (!commetUserId) {
      setError("Debes iniciar sesión para publicar un comentario.");
      return;
    }

    // Validar que se haya seleccionado un rating
    if (newRating === 0) {
      setError("Por favor, selecciona un rating.");
      return;
    }

    // Crear el objeto con los datos del nuevo comentario
    const newRatingData = {
      product_id,
      user_id: commetUserId,
      rating: newRating,
      comment: newComment,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_URL_BASE}/reviews/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newRatingData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar el comentario");
      }

      const result = await response.json();
      if (result.success) {
        // Agregar el nuevo comentario a la lista
        setComments([...comments, result.data]);
        // Limpiar el campo de comentario y el rating
        setNewComment("");
        setNewRating(5);
        // Limpiar el mensaje de error
        setError("");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Función para eliminar un comentario
  const handleDeleteComment = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_URL_BASE}/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ user_id: commetUserId }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el comentario");
      }

      const result = await response.json();
      if (result.success) {
        // Filtrar los comentarios para eliminar el comentario eliminado
        setComments(
          comments.filter((comment) => comment.review_id !== reviewId)
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Función para formatear la fecha
  const formatDate = (isoDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(isoDate).toLocaleDateString("es-ES", options);
  };

  // Componente de estrellas para seleccionar el rating
  const StarRating = ({ rating, setRating }) => {
    return (
      <div className="flex items-center space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-2xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      {visible && (
        <section className="bg-white dark:bg-gray-200 py-8 lg:py-16 antialiased rounded-lg">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                Comentarios
              </h2>
            </div>

            {commetUserId ? (
              <div className="bg-slate-400 border-r-medium p-4 mb-6 rounded-lg">
                <form onSubmit={handleSubmit} className="mb-6">
                  <div className="py-2 px-4 mb-4 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label htmlFor="comment" className="sr-only">
                      Tu comentario
                    </label>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      id="comment"
                      rows="4"
                      className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      placeholder="Escribe un comentario..."
                      required
                    ></textarea>
                  </div>

                  <span className="block mb-2 text-sm font-semibold text-gray-900">
                    Calificación:
                  </span>
                  <StarRating rating={newRating} setRating={setNewRating} />
                  <button
                    type="submit"
                    className="py-2.5 px-4 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Publicar comentario
                  </button>
                </form>
              </div>
            ) : (
              <Link to="/login" className="hover:animate-zoom-in-horizontal">
                <div className="w-full flex items-center my-3">
                  <Alert color="secondary" variant="solid">
                    Inicia sesión para publicar un comentario.
                  </Alert>
                </div>
              </Link>
            )}
            {/* Mensajes de carga, error y lista de comentarios */}
            {loading && (
              <p className="text-gray-500">Cargando comentarios...</p>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && comments.length === 0 && (
              <p className="text-gray-500">No hay comentarios aún.</p>
            )}

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
                        src={comment.url_img_profile}
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
                  {/* Mostrar el rating en estrellas */}
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-xl ${
                          star <= comment.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    {/* Botón para eliminar el comentario si pertenece al usuario actual */}
                    {comment.user_id === commetUserId && (
                      <button
                        onClick={() => handleDeleteComment(comment.review_id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        <Icon
                          name="trash"
                          className="hover:text-[--color-highlight] transition-all"
                        />
                      </button>
                    )}
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
