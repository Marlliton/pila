import { Account, User } from "@prisma/client";
import supertest from "supertest";
import app from "../../src/app";
import { getAccountService, getUserService } from "../../src/models";
const request = supertest(app);

async function createUserAuth() {
  const user = await getUserService().create({
    name: "Marlliton Account",
    email: `${Date.now()}@account.com`,
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

async function createAccount(name: string, userId: number) {
  const response = await getAccountService().create({
    name,
    userId,
  } as Account);

  return response;
}

describe("Deve testar rotas de account", () => {
  it("Deve criar uma conta com um usuário vinculado", async () => {
    const { token } = await createUserAuth();

    const response = await request
      .post(`/accounts/`)
      .set({
        authorization: `Bearer ${token}`,
      })
      .send({
        name: "conta de teste",
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("name", "conta de teste");
  });

  it("Deve buscar a conta do usuário logado", async () => {
    const { user, token } = await createUserAuth();
    await createAccount("account default", user.id);

    const response = await request.get(`/accounts/${user.id}`).set({
      authorization: `Bearer ${token}`,
    });

    console.log(response.body)
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("name", "account default");
  });

  it("Deve atualizar a conta do usuário", async () => {
    const { user, token } = await createUserAuth();
    await createAccount("Conta para atualizar", user.id)
    const response = await request.put(`/accounts/${user.id}`).set({
      authorization: `Bearer ${token}`,
    }).send({
      name: "conta atualizada"
    })

    expect(response.statusCode).toEqual(200);
  });

  it("Deve apagar a conta do usuário", async () => {
    const { user, token } = await createUserAuth();
    await createAccount("Conta para apagar", user.id)
    const response = await request.delete(`/accounts/${user.id}`).set({
      authorization: `Bearer ${token}`,
    }).send({
      name: "conta apagada"
    })

    expect(response.statusCode).toEqual(200);
  });
});
