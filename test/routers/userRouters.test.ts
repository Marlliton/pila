import { User } from "@prisma/client";
import supertest from "supertest";
import app from "../../src/app";
import { getUserService } from "../../src/models";

const request = supertest(app);

describe("Deve testar as rotas de usuário", () => {
  it("Deve consultar o usuário logado", async () => {
    const userDb = await getUserService().create({
      name: "marlliton",
      email: `${Date.now()}@gmail.com`,
      password: "123",
    } as User);

    const token = await request.post("/auth/signing").send({
      email: userDb.email,
      password: "123",
    });

    const user = await request.get(`/users/${userDb.id}`).set({
      authorization: `Bearer ${token.body.token}`,
    });

    expect(user.body).toHaveProperty("id", userDb.id);
  });

  it("Deve atualizar o usuário logado", async () => {
    const userDb = await getUserService().create({
      name: "marlliton",
      email: `${Date.now()}@gmail.com`,
      password: "123",
    } as User);

    const token = await request.post("/auth/signing").send({
      email: userDb.email,
      password: "123",
    });

    const updatedEmail = `marlliton@${Date.now()}mail.com`;
    const user = await request
      .put(`/users/${userDb.id}`)
      .set({
        authorization: `Bearer ${token.body.token}`,
      })
      .send({
        name: "Marlliton Souza",
        email: updatedEmail,
      });

    console.log(user.body);
    expect(user.body).toHaveProperty("email", updatedEmail);
  });

  it("Deve excluir um usurário", async () => {
    const userDb = await getUserService().create({
      name: "marlliton",
      email: `${Date.now()}@gmail.com`,
      password: "123",
    } as User);

    const token = await request.post("/auth/signing").send({
      email: userDb.email,
      password: "123",
    });

    const response = await request.delete(`/users/${userDb.id}`).set({
      authorization: `Bearer ${token.body.token}`,
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("email", userDb.email);
  });
});
