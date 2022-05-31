import supertest from "supertest";
import app from "../../src/app";

const request = supertest(app);
describe("Testa a rota de autenticação", () => {
  test("Deve receber o token de autenticação", async () => {
    const mail = `${Date.now()}.gmail.com`;
    await request.post("/users").send({
      name: "Usuário autenticado",
      email: mail,
      password: "134",
    });

    const result = await request.post("/auth/signing").send({
      email: mail,
      password: "134",
    });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("token");
  });

  test("Não deve autenticar usuário com senha errada", async () => {
    const mail = `${Date.now()}.gmail.com`;
    await request.post("/users").send({
      name: "Usuário autenticado",
      email: mail,
      password: "134",
    });

    const result = await request.post("/auth/signing").send({
      email: mail,
      password: "13",
    });
    expect(result.statusCode).toEqual(401);
    expect(result.body).toHaveProperty("message", "Invalid password or email");
  });

  test("Não prosseguir se o usuário não existir", async () => {
    const result = await request.post("/auth/signing").send({
      email: `${Date.now()}.nao-existe.com`,
      password: "134",
    });
    expect(result.statusCode).toEqual(204);
  });
});
