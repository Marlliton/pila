import UserPrisma from "../service/prisma/UserPrisma";
import AccountPrisma from "../service/prisma/AccountPrisma";
import UserService from "./user/UserService";
import AccountService from "./account/AccountService";

export function getUserService(): UserService {
  return new UserService(new UserPrisma());
}

export function getAccountService(): AccountService {
  return new AccountService(new AccountPrisma());
}
