import request from "supertest";
import app from "../src/app";
describe("Deve subir o servidor corretamente", () => {
  test("Deve retornar chamar a rota principal", async () => {
    const result = await request(app).get("/");
    expect(result.statusCode).toEqual(200);
  });
});
