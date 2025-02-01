import request from "supertest";
import app from "../server.js";
import { pool } from "../database/index.js";

// Para realizar los test hay que descomentar en el archivo .env "NODE_ENV"
// Hay que cambiar el token para que funcione (porque le pusimos duración de 24 horas)
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlbGxlckBleGFtcGxlLmNvbSIsImlhdCI6MTczODQyOTE2NiwiZXhwIjoxNzM4NTE1NTY2fQ.dYulPk73tuFN8kDrjVB0elkvNXIQN0lcJ9xuE_hZn2Y";

let server;
const testUserId = 28;  // Aqui puedes cambiar el ID del usuario que deseas probar, teniendo en cuenta que se borrara al final :(

describe("Pruebas de la ruta /user", () => {
    beforeAll(async () => {
        server = app.listen(0);
        const userCheckResponse = await request(server)
            .get(`/user/${testUserId}`)
            .set("Authorization", `Bearer ${authToken}`);

        if (userCheckResponse.statusCode !== 200) {
            throw new Error(`El usuario con ID ${testUserId} no existe en la base de datos`);
        }
    });

    afterAll(async () => {
        await new Promise((resolve) => server.close(resolve));
        await pool.end();
    });

    // ** Rutas privadas **

    test("Debería obtener todos los usuarios (GET /user)", async () => {
        const response = await request(server)
            .get("/user")
            .set("Authorization", `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test("Debería obtener un usuario por ID (GET /user/:id)", async () => {
        const response = await request(server)
            .get(`/user/${testUserId}`)
            .set("Authorization", `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.user_id).toBe(testUserId);
    });

    test("Debería actualizar un usuario (PUT /user/:id)", async () => {
        const updatedUser = {
            username: "UsuarioActualizado",
            rut: "12345678-9",
            birth_date: "1990-01-01",
            email: "actualizado@example.com",
            phone: "123456789",
            password: "newPassword123",
            role: "user",
            status: true
        };

        const response = await request(server)
            .put(`/user/${testUserId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send(updatedUser);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.username).toBe("UsuarioActualizado");
    });

    test("Debería cambiar el estado de un usuario (PUT /user/status/:id)", async () => {
        const response = await request(server)
            .put(`/user/status/${testUserId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send({ status: false });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.status).toBe(false);
    });

    test("Debería actualizar la imagen de perfil del usuario (PUT /user/profile-image/:id)", async () => {
        const response = await request(server)
            .put(`/user/profile-image/${testUserId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send({ url_img_profile: "https://example.com/new-profile.jpg" });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.url_img_profile).toBe("https://example.com/new-profile.jpg");
    });

    test("Debería eliminar el usuario (DELETE /user/:id)", async () => {
        const response = await request(server)
            .delete(`/user/${testUserId}`)
            .set("Authorization", `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });
});
