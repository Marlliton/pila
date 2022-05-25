import supertest from "supertest";
import app from "../../src/app";

const request = supertest(app);
let user: any = {};
beforeAll(async () => {
  const res = await request.post("/users").send({
    name: "User account insert",
    email: `user_account.${Date.now()}.test.com`,
    password: "1234",
  });

  user = { ...res.body };
});

describe("Should test account routes", () => {
  test("Should enter an account successfully", async () => {
    const result = await request.post("/accounts").send({
      name: "Account insert",
      userId: user.id,
    });

    expect(result.statusCode).toEqual(201);
  });

  test("Should receive status code 403 if no send data", async () => {
    const result = await request.post("/accounts").send({
      name: "Account insert",
    });

    expect(result.statusCode).toEqual(403);
  });

  test("Should list all accounts", async () => {
    const userList = await request.post("/users").send({
      name: "User List",
      email: `user_list.${Date.now()}.test.com`,
      password: "1234",
    });

    await request.post("/accounts").send({
      name: "Account list",
      userId: userList.body.id,
    });
    const list = await request.get("/accounts");

    expect(list.statusCode).toEqual(200);
    expect(list.body.length).toBeGreaterThan(0);
  });

  test("Should get a specific account", async () => {
    const result = await request.get("/accounts/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("id", 1);
  });

  test("Should receive a status code 204 when accessing an account that not exist", async () => {
    const result = await request.get("/accounts/0");
    expect(result.statusCode).toEqual(204);
  });

  test("Should update an account", async () => {
    const result = await request.put("/accounts/1").send({
      name: "account updated",
      userId: 1,
    });

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("id", 1);
    expect(result.body).toHaveProperty("name", "account updated");
    expect(result.body).toHaveProperty("userId", 1);
  });

  test("Should return status 403 if no send data", async () => {
    const result = await request.put("/accounts/1").send({
      name: "account updated",
    });

    expect(result.statusCode).toEqual(403);
    expect(result.body).toHaveProperty("error");
  });

  test("Should delete an account", async () => {
    const userList = await request.post("/users").send({
      name: "User List",
      email: `user_list.${Date.now()}.test.com`,
      password: "1234",
    });

    const account = await request.post("/accounts").send({
      name: "Account list",
      userId: userList.body.id,
    });

    const accountDeleted = await request.delete(
      `/accounts/${account.body?.id}`
    );


    expect(accountDeleted.statusCode).toEqual(200);
    expect(accountDeleted.body).toHaveProperty("id", account.body.id);
  });
});
