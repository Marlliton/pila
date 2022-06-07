import { User } from "@prisma/client";
import { response } from "express";
import supertest from "supertest";
import app from "../../src/app";
import { getUserService } from "../../src/models";

const request = supertest(app);

async function createUserDb() {
  const user = await getUserService().create({
    name: "user account",
    email: `${Date.now()}.teste`,
    password: "123",
  } as User);

  const token = await request.post("/auth/signing").send({
    email: user.email,
    password: "123",
  });

  return { user, token };
}

describe("Deve testar as rotas de accounts", () => {
  it("Deve criar uma conta", async () => {
    const { token, user } = await createUserDb();
    const response = await request
      .post("/accounts")
      .set({
        authorization: `Bearer ${token.body.token}`,
      })
      .send({
        name: "Sem criatividade",
      });
    expect(response.statusCode).toEqual(201);
  });

  it("Não deve inserir uma conta sem nome", async () => {
    const { token, user } = await createUserDb();
    const response = await request
      .post("/accounts")
      .set({
        authorization: `Bearer ${token.body.token}`,
      })
      .send({});
    expect(response.statusCode).toEqual(403);
  });

  it("Deve retornar uma conta por id", async () => {
    const { token, user } = await createUserDb();
    const response = await request.get(`/users/${user.id}`).set({
      authorization: `Bearer ${token.body.token}`,
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("id", user.id);
  });

  it("Deve alterar uma conta", async () => {
    const { token, user } = await createUserDb();
    await request
      .post("/accounts")
      .set({
        authorization: `Bearer ${token.body.token}`,
      })
      .send({
        name: "Sem criatividade",
      });

    const response = await request
      .put(`/accounts/${user.id}`)
      .set({
        authorization: `Bearer ${token.body.token}`,
      })
      .send({
        name: "Com criatividade",
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("name", "Com criatividade");
  });

  it("Deve apagar uma conta", async () => {
    const { token, user } = await createUserDb();

    await request
      .post("/accounts")
      .set({
        authorization: `Bearer ${token.body.token}`,
      })
      .send({
        name: "conta deletada",
      });

    const response = await request.delete(`/accounts/${user.id}`).set({
      authorization: `Bearer ${token.body.token}`,
    });
    console.log(response.body)

    expect(response.statusCode).toEqual(200);
  });
});
