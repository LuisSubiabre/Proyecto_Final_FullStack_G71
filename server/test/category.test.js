import request from "supertest";
import app from "../server.js";
import { pool } from "../database/index.js";

// Para realizar los test hay que descomentar en el archivo .env "NODE_ENV"
// Hay que cambiar el token para que funcione (porque le pusimos duración de 24 horas)
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlbGxlckBleGFtcGxlLmNvbSIsImlhdCI6MTczODQyOTE2NiwiZXhwIjoxNzM4NTE1NTY2fQ.dYulPk73tuFN8kDrjVB0elkvNXIQN0lcJ9xuE_hZn2Y";

let server;

describe("Pruebas de categorías y subcategorías", () => {
    let createdCategoryId;
    let createdSubcategoryId;

    beforeAll(async () => {
        server = app.listen(0); // Puerto dinámico
    });

    afterAll(async () => {
        await new Promise((resolve) => server.close(resolve));
        await pool.end();
    });

    // Los subdividimos en dos grupos: ** Categorías ** y ** Subcategorías **
    // ** Categorías **

    test("Debería crear una nueva categoría (POST /)", async () => {
        const response = await request(server)
            .post("/category")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ name_categories: "Categoría de Prueba" });

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        createdCategoryId = response.body.data.category_id;
    });

    test("Debería obtener todas las categorías (GET /)", async () => {
        const response = await request(server).get("/category");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.some(cat => cat.name_categories === "Categoría de Prueba")).toBe(true);
    });

    test("Debería actualizar una categoría (PUT /:id)", async () => {
        const response = await request(server)
            .put(`/category/${createdCategoryId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send({ name_categories: "Categoría Actualizada" });

        expect(response.statusCode).toBe(200);
        expect(response.body.data.name_categories).toBe("Categoría Actualizada");
    });

    // ** Subcategorías **

    test("Debería crear una nueva subcategoría (POST /subcategory)", async () => {
        const response = await request(server)
            .post("/category/subcategory")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ name_subcategories: "Subcategoría de Prueba", category_id: createdCategoryId });

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        createdSubcategoryId = response.body.data.subcategory_id;
    });

    test("Debería obtener todas las subcategorías (GET /subcategory)", async () => {
        const response = await request(server).get("/category/subcategory");
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.some(sub => sub.name_subcategories === "Subcategoría de Prueba")).toBe(true);
    });

    test("Debería eliminar una subcategoría (DELETE /subcategory/:id)", async () => {
        const response = await request(server)
            .delete(`/category/subcategory/${createdSubcategoryId}`)
            .set("Authorization", `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test("Debería eliminar una categoría (DELETE /:id)", async () => {
        const response = await request(server)
            .delete(`/category/${createdCategoryId}`)
            .set("Authorization", `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });
});
