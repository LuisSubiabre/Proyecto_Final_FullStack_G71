const errorHandler = (error) => {
    if (error.response) {
        const { status, data } = error.response;
        console.error('Error en respuesta del servidor:', data);

        switch (status) {
            case 400:
                return Promise.reject({
                    message: data.error || 'Solicitud incorrecta. Revisa los datos enviados.',
                    status,
                });

            case 401:
                return Promise.reject({
                    message: data.error || 'No autorizado. Inicia sesión nuevamente.',
                    status,
                });

            case 403:
                return Promise.reject({
                    message: data.error || 'Acceso prohibido. No tienes permisos para realizar esta acción.',
                    status,
                });

            case 404:
                return Promise.reject({
                    message: data.error || 'Recurso no encontrado.',
                    status,
                });

            case 409:
                return Promise.reject({
                    message: data.error || 'Conflicto en la solicitud. Puede que el recurso ya exista.',
                    status,
                });

            case 422:
                return Promise.reject({
                    message: data.error || 'Datos no válidos. Por favor, revisa la información enviada.',
                    status,
                });

            case 429:
                return Promise.reject({
                    message: data.error || 'Demasiadas solicitudes. Por favor, inténtalo de nuevo más tarde.',
                    status,
                });

            case 500:
                return Promise.reject({
                    message: data.error || 'Error interno en el servidor. Intenta nuevamente más tarde.',
                    status,
                });

            case 503:
                return Promise.reject({
                    message: data.error || 'Servicio no disponible. Por favor, intenta más tarde.',
                    status,
                });

            default:
                return Promise.reject({
                    message: data.error || 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.',
                    status,
                });
        }
    } else if (error.request) {
        console.error('No se recibió respuesta:', error.request);
        return Promise.reject({
            message: 'No se recibió respuesta del servidor. Comprueba tu conexión o inténtalo nuevamente más tarde.',
        });
    } else {
        console.error('Error en la configuración de la petición:', error.message);
        return Promise.reject({
            message: error.message,
        });
    }
};

export default errorHandler;
