import request from "supertest";
import app from "../server.js";
import { pool } from "../database/index.js";

// Para realizar los test hay que descomentar en el archivo .env "NODE_ENV"
// Hay que cambiar el token para que funcione (porque le pusimos duración de 24 horas)
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInVzZXJuYW1lIjoicGVwaXRvcSIsImVtYWlsIjoicGVwaXRvMkBob2xhLmNvbSIsImlhdCI6MTczODcxNDMwOSwiZXhwIjoxNzM4ODAwNzA5fQ.5LDXqbwckHMAjZ3XfCboRD309mupexP9CSW8-8BOHsU";

let server;

describe("Pruebas de reviews", () => {
  let createdReviewId;

  beforeAll(async () => {
    server = app.listen(0); // Puerto dinámico
  });

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
    await pool.end();
  });

  // ** Rutas públicas **

  test("Debería obtener todos los reviews de un producto (GET /reviews/product/65)", async () => {
    const response = await request(server).get("/reviews/product/65");
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // // ** Rutas privadas **

  test("Debería crear un nuevo review (POST /reviews)", async () => {
    const newReview = {
      product_id: 65,
      user_id: 34,
      rating: 3,
      comment:
        "¡Me encantó este álbum de stickers! Las ilustraciones son hermosas y la calidad es excelente.",
    };

    const response = await request(server)
      .post("/reviews")
      .set("Authorization", `Bearer ${authToken}`)
      .send(newReview);

    expect(response.body.data).toMatchObject({
      product_id: newReview.product_id,
      user_id: newReview.user_id,
      rating: newReview.rating,
      comment: newReview.comment,
    });

    // Verificar que se generó un review_id
    expect(response.body.data.review_id).toBeDefined();

    // Guardar el review_id para usarlo en otros tests (si es necesario)
    createdReviewId = response.body.data.review_id;
  });

  test("Debería actualizar una review (PUT /reviews/:id_review)", async () => {
    // Incluye todos los campos obligatorios que espera el backend
    const updateReview = {
      product_id: 65,
      user_id: 34,
      rating: 5,
      comment:
        "¡Me encantó este álbum de stickers! Las ilustraciones son hermosas y la calidad es excelente!!!!!",
    };
    const response = await request(server)
      .put(`/reviews/${createdReviewId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(updateReview);

    // Log para verificar si el test está fallando en la respuesta
    console.log("Respuesta del servidor (actualización):", response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject(updateReview);
  });

  test("Debería eliminar una review (DELETE /reviews/:id_review)", async () => {
    const deleteReview = {
      product_id: 65,
      user_id: 34,
    };
    const response = await request(server)
      .delete(`/reviews/${createdReviewId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(deleteReview);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
