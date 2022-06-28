import { Account, User } from "@prisma/client";
import supertest from "supertest";
import app from "../../src/app";
import {
  getAccountService,
  getTransactionService,
  getUserService,
} from "../../src/models";
const request = supertest(app);

async function createUserAuth(name: string) {
  const user = await getUserService().create({
    name,
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

async function createAccount(name: string, userId: number) {
  const response = await getAccountService().create(name, userId, 10);

  return response;
}

let user1: any;
let user2: any;
let account1: Account;
let account2: Account;

beforeAll(async () => {
  user1 = await createUserAuth("Usuário 01");
  user2 = await createUserAuth("Usuário 02");
  account1 = await createAccount("Conta user 1", user1.user.id);
  account2 = await createAccount("Conta user 2", user2.user.id);
});

describe("Deve testar as rotas de transações", () => {
  it.skip("Deve criar uma transaction", async () => {
    const { user, token } = await createUserAuth(
      "Usuário da primeira transação"
    );
    const account = await createAccount("Rota de criação de conta", user.id);

    const response = await request
      .post("/transaction")
      .set({
        authorization: `Bearer ${token}`,
      })
      .send({
        description: "Entrada de Dinheiro",
        type: "INCOME",
        date: new Date(),
        value: 230,
        accountId: account.id,
      });

    expect(response.statusCode).toEqual(200);
  });
  it("Não deve criar uma transaction com valor negativo", async () => {
    const { user, token } = await createUserAuth(
      "Usuário da primeira transação"
    );
    const account = await createAccount("Rota de criação de conta", user.id);

    const response = await request
      .post("/transaction")
      .set({
        authorization: `Bearer ${token}`,
      })
      .send({
        description: "Entrada de Dinheiro",
        type: "INCOME",
        date: new Date(),
        value: -100,
        accountId: account.id,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.value).toBe("100");
  });
  it.skip("Não deve criar uma transaction com valor positivo", async () => {
    const { user, token } = await createUserAuth(
      "Usuário da primeira transação"
    );
    const account = await createAccount("Rota de criação de conta", user.id);

    const response = await request
      .post("/transaction")
      .set({
        authorization: `Bearer ${token}`,
      })
      .send({
        description: "Entrada de Dinheiro",
        type: "OUTCOME",
        date: new Date(),
        value: 100,
        accountId: account.id,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.value).toBe("-100");
  });

  it.skip("Deve listar as transações do usuário logado", async () => {
    await getTransactionService().createTransaction(
      "Transação usuário 01",
      "INCOME",
      new Date(),
      100,
      account1.id
    );
    await getTransactionService().createTransaction(
      "Transação usuário 02",
      "OUTCOME",
      new Date(),
      200,
      account2.id
    );
    await getTransactionService().createTransaction(
      "Transação usuário 02 outro teste",
      "OUTCOME",
      new Date(),
      200,
      account2.id
    );

    const response = await request.get(`/transaction/${user2.user.id}`).set({
      authorization: `Bearer ${user2.token}`,
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it.skip("Deve alterar uma transação", async () => {
    const transaction = await getTransactionService().createTransaction(
      "Transação que deve ser atualizada",
      "OUTCOME",
      new Date(),
      300,
      account2.id
    );

    const response = await request
      .put(`/transaction/${transaction.id}`)
      .set({
        authorization: `Bearer ${user2.token}`,
      })
      .send({
        description: "Entrada de Dinheiro Atualizada",
        type: "INCOME",
        date: new Date(),
        value: 235.99,
        accountId: account2.id,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty(
      "description",
      "Entrada de Dinheiro Atualizada"
    );
  });

  it.skip("Deve excluir uma transação", async () => {
    const transaction = await getTransactionService().createTransaction(
      "Transação que deve ser atualizada",
      "OUTCOME",
      new Date(),
      300,
      account2.id
    );

    const response = await request
      .delete(`/transaction/${transaction.id}`)
      .set({
        authorization: `Bearer ${user2.token}`,
      });
    expect(response.statusCode).toEqual(200);
  });

  // TODO fazer teste de validação de acesso a recursos do banco.

  // it.skip("Não deve excluir uma transação de outro usuário", async () => {
  //   const transaction = await getTransactionService().createTransaction(
  //     "Transação que deve ser atualizada",
  //     "OUTCOME",
  //     new Date(),
  //     300,
  //     account2.id
  //   );
  //   const userNotPermission = await createUserAuth("Sem Permissão");
  //   const response = await request
  //     .delete(`/transaction/${transaction.id}`)
  //     .set({
  //       authorization: `Bearer ${userNotPermission.token}`,
  //     });
  //   expect(response.statusCode).toEqual(200);
  // });
});
