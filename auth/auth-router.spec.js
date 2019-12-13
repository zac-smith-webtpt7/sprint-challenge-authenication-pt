const request = require("supertest");
const server = require("../api/server.js");

describe("server.js", () => {
  describe("register endpoint", () => {
    it("should return 400 status code", async () => {
      const expectedStatusCode = 400;
      const response = await request(server).post("/api/auth/register");

      expect(response.status).toBe(expectedStatusCode);
    });

    it("should return an Object", async () => {
      const response = await request(server).post("/api/auth/register");
      expect(response.type).toMatch("application/json");
    });
  });

  describe("login endpoint", () => {
    it("should return 500 status code if nothing is sent", async () => {
      const expectedStatusCode = 500;
      const response = await request(server).post("/api/auth/login");

      expect(response.status).toBe(expectedStatusCode);
    });

    it("user is able to log in", async () => {
      const response = await request(server)
        .post("/api/auth/register")
        .send({ username: "user1", password: "1111" });

      expect(200);
    });
  });
});
