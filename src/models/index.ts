import UserPrisma from "../service/prisma/UserPrisma";
import AccountPrisma from "../service/prisma/AccountPrisma";
import UserService from "./user/UserService";
import AccountService from "./account/AccountService";
import TransactionService from "./transaction/TransactionService";
import TransactionPrisma from "../service/prisma/TransactionPrisma";

export function getUserService(): UserService {
  return new UserService(new UserPrisma());
}

export function getAccountService(): AccountService {
  return new AccountService(new AccountPrisma());
}

export function getTransactionService(): TransactionService {
  return new TransactionService(new TransactionPrisma());
}
