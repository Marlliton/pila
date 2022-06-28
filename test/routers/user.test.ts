import { User } from "@prisma/client";
import supertest from "supertest";
import app from "../../src/app";
import { getUserService } from "../../src/models";
const request = supertest(app);

async function createUserAuth() {
  const user = await getUserService().create({
    name: "Marlliton Default User",
    email: `${Date.now()}@teste.com`,
    password: "123",
  } as User);

  const token = await request.post("/auth/signing").send({
    email: user?.email,
    password: "123",
  });

  return {
    user,
    token: token.body.token,
  };
}

describe("Deve testar rotas de usuário", () => {
  it("Deve retornar o usuário que está autenticado", async () => {
    const { user, token } = await createUserAuth();

    const response = await request.get(`/users/${user.id}`).set({
      authorization: `Bearer ${token}`,
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("name", "Marlliton Default User");
  });

  it("Deve atualizar o usuário logado", async () => {
    const { user, token } = await createUserAuth();

    const response = await request
      .put(`/users/${user.id}`)
      .set({
        authorization: `Bearer ${token}`,
      })
      .send({
        name: "Marlliton Atualizado",
        email: user.email,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("name", "Marlliton Atualizado");
  });

  it("Deve Deletar o usuário logado", async () => {
    const { user, token } = await createUserAuth();
    const response = await request.delete(`/users/${user.id}`).set({
      authorization: `Bearer ${token}`,
    });

    expect(response.statusCode).toEqual(200);
  });
});
