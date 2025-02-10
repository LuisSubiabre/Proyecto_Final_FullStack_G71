import request from "supertest";
import app from "../server.js";
import { pool } from "../database/index.js";

// Para realizar los test hay que descomentar en el archivo .env "NODE_ENV"
// Hay que cambiar el token para que funcione (porque le pusimos duración de 24 horas)
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlbGxlckBleGFtcGxlLmNvbSIsImlhdCI6MTczODQyOTE2NiwiZXhwIjoxNzM4NTE1NTY2fQ.dYulPk73tuFN8kDrjVB0elkvNXIQN0lcJ9xuE_hZn2Y";

let server;

describe("Pruebas de productos", () => {
    let createdProductId;

    beforeAll(async () => {
        server = app.listen(0);  // Puerto dinámico
    });

    afterAll(async () => {
        await new Promise((resolve) => server.close(resolve));
        await pool.end();
    });

    // ** Rutas públicas **

    test("Debería obtener todos los productos (GET /products)", async () => {
        const response = await request(server).get("/products");
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test("Debería buscar productos por descripción (GET /products/search)", async () => {
        const response = await request(server).get("/products/search").query({ description: "ejemplo" });
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test("Debería obtener un producto por ID (GET /products/:id)", async () => {
        const productId = 3;
        const response = await request(server).get(`/products/${productId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test("Debería obtener productos por categoría (GET /products/category/:categoryId)", async () => {
        const categoryId = 1;
        const response = await request(server).get(`/products/category/${categoryId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });

    // ** Rutas privadas **

    test("Debería crear un nuevo producto (POST /products)", async () => {
        const newProduct = {
            name_product: "Producto de prueba",
            description: "Descripción del producto",
            brand: "Marca",
            price: 100,
            quantity: 10,
            category_id: 1,
            user_id: 5,
            image_url: "https://example.com/product.jpg",
            subcategory_id: 2,
        };

        const response = await request(server)
            .post("/products")
            .set("Authorization", `Bearer ${authToken}`)
            .send(newProduct);

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        createdProductId = response.body.data.product_id;
    });

    test("Debería actualizar un producto (PUT /products/:id)", async () => {
        // Incluye todos los campos obligatorios que espera el backend
        const updatedProduct = {
            name_product: "Producto actualizado",
            description: "Descripción actualizada",
            brand: "Marca actualizada",
            price: 200,
            quantity: 15,
            category_id: 1,
            status: false,
            user_id: 5,
            image_url: "https://example.com/product_updated.jpg",
            subcategory_id: 2,
        };
        const response = await request(server)
            .put(`/products/${createdProductId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send(updatedProduct);
    
        // Log para verificar si el test está fallando en la respuesta
        console.log("Respuesta del servidor (actualización):", response.body);
    
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.name_product).toBe("Producto actualizado");
    });

    test("Debería cambiar el estado de un producto (PATCH /products/:id/status)", async () => {
        const response = await request(server)
            .patch(`/products/${createdProductId}/status`)
            .set("Authorization", `Bearer ${authToken}`)
            .send({ status: false });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.status).toBe(false);
    });

    test("Debería eliminar un producto (DELETE /products/:id)", async () => {
        const response = await request(server)
            .delete(`/products/${createdProductId}`)
            .set("Authorization", `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });
});
