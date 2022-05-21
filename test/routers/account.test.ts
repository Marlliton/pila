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
    console.log(result.body);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("id", 1);
  });

  test("Should receive a status code 204 when accessing an account that not exist", async () => {
    const result = await request.get("/accounts/0");
    console.log(result.body);
    expect(result.statusCode).toEqual(204);
  });

  
});
