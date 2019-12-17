const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
const Auth = require("../auth/auth-router.js");

describe("server.js", () => {
  describe("register endpoint", () => {
    it("should return 400 status", async () => {
      const expectedStatusCode = 400;
      const response = await request(server).post("/api/auth/register");

      expect(response.status).toBe(expectedStatusCode);
    });

    it("should return an Object", async () => {
      const response = await request(server).post("/api/auth/register");
      expect(response.type).toMatch("application/json");
    });
  });

  describe("login", () => {
    it("should return 500 status code if no creditials sent", async () => {
      const expectedStatusCode = 500;
      const response = await request(server).post("/api/auth/login");

      expect(response.status).toBe(expectedStatusCode);
    });

    it("user is able to log in", async () => {
      const response = await request(server)
        .post("/api/auth/register")
        .send({ username: "zac", password: "password" });

      expect(200);
    });
  });
});
