const request = require("supertest");
const app = require("../app");

describe("Auth APIs", () => {
    let uniqueEmail;

    beforeAll(() => {
        uniqueEmail = `testuser_${Date.now()}@example.com`;
    });

    const userData = () => ({
        name: "Test User",
        email: uniqueEmail,
        password: "password123",
    });

    it("should register a new user", async () => {
        const res = await request(app)
            .post("/api/register")
            .send(userData());

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.email).toBe(uniqueEmail);
    });

    it("should login a user and return token", async () => {
        const res = await request(app)
            .post("/api/login")
            .send({ email: uniqueEmail, password: "password123" });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.token).toBeDefined();
    });
});
