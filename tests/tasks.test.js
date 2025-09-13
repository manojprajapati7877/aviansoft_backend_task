const request = require("supertest");
const app = require("../app");

describe("Task APIs", () => {
    let token;
    let uniqueEmail;

    beforeAll(async () => {
        uniqueEmail = `taskuser_${Date.now()}@example.com`;
        await request(app)
            .post("/api/register")
            .send({
                name: "Task User",
                email: uniqueEmail,
                password: "password123",
            });
        const res = await request(app)
            .post("/api/login")
            .send({ email: uniqueEmail, password: "password123" });

        token = res.body.data.token;
    });

    const createTask = (overrides = {}) => ({
        title: "First Task",
        description: "This is my first task",
        ...overrides,
    });

    it("should create a new task", async () => {
        const res = await request(app)
            .post("/api/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send(createTask());

        expect(res.statusCode).toBe(201);
        expect(res.body.data.title).toBe("First Task");
    });

    it("should fetch all tasks", async () => {
        const res = await request(app)
            .get("/api/tasks")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});
