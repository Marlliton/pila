import supertest from "supertest";
import app from "../../src/app";

const request = supertest(app);
const userEmail = `${Date.now()}@test.test.com`;
let firstUser: any = {};

beforeAll(async () => {
  const response = await request.post("/users").send({
    name: "First User",
    email: `first_user.${userEmail}`,
    password: "1234",
  });
  firstUser = { ...response.body };
});

describe("Deve testar as rotas de usuário", () => {
  test("Deve pegar todos os usuários no banco", async () => {
    const result = await request.get("/users");
    expect(result.statusCode).toEqual(200);
    expect(result.body.length).toBeGreaterThan(0);
  });

  test("Deve buscar apenas um usuário no banco", async () => {
    const testGet = await request.post("/users").send({
      name: "Teste Get",
      email: `get${Date.now()}@test.test`,
      password: "1234",
    });

    const result = await request.get(`/users/${testGet.body?.id}`);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("name", "Teste Get");
  });

  test("Deve buscar o usuário inexistente no banco e o status tem que ser 204", async () => {
    const result = await request.get("/users/0");
    expect(result.statusCode).toEqual(204);
  });

  test("Deve criar um usuário", async () => {
    const result = await request.post("/users").send({
      name: "Testes Unitários",
      email: userEmail,
      password: "1234",
    });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty("name", "Testes Unitários");
    expect(result.body).toHaveProperty("email", userEmail);
    expect(result.body).not.toHaveProperty("password");
  });

  test("Deve receber um 404 ao tentar criar um usuário já existente", async () => {
    const result = await request.post("/users").send({
      name: "marlliton souza",
      email: userEmail,
      password: "1234",
    });

    expect(result.statusCode).toEqual(403);
    expect(result.body).toHaveProperty("error", "User already exist");
  });

  test("Deve receber um 404 ao tentar criar um usuário com dados nulos", async () => {
    const result = await request.post("/users").send({
      email: "souza@testej.dev.",
    });

    expect(result.statusCode).toEqual(403);
    expect(result.body).toHaveProperty("error", "Fill in all fields");
  });

  test("Deve atualizar o usuário", async () => {
    const testUpdate = await request.post("/users").send({
      name: "Teste Get",
      email: `get${Date.now()}@test.test`,
      password: "1234",
    });

    const result = await request.put(`/users/${testUpdate.body?.id}`).send({
      name: "Ana Maria",
      email: testUpdate.body?.email,
    });

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("name", "Ana Maria");
    expect(result.body).toHaveProperty("email", testUpdate.body?.email);
  });

  test("Deve receber 403 ao tentar atualizar com dados nulos", async () => {
    const testUpdate = await request.post("/users").send({
      name: "Teste update null data",
      email: `get${Date.now()}@test.test`,
      password: "1234",
    });

    const result = await request.put(`/users/${testUpdate.body?.id}`).send({
      name: "Outro",
    });

    expect(result.statusCode).toEqual(403);
  });

  test("Deve deletar um usuário", async () => {
    const user = await request.post("/users").send({
      name: "Delete test",
      email: `Delete${userEmail}`,
      password: "1234",
    });

    const result = await request.delete(`/users/${user.body?.id}`);

    expect(result.statusCode).toEqual(200);
  });
});
