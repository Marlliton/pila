import { Account } from "@prisma/client";
import { AccountRepository } from "./AccountRepository";

export default class AccountService implements AccountRepository {
  #repository: AccountRepository;
  constructor(repo: AccountRepository) {
    this.#repository = repo;
  }
  getBalance (accountId: number): Promise<any> {
    return this.#repository.getBalance(accountId)
  }
  updateBalance(accountId: number, balance: number): Promise<void> {
    return this.#repository.updateBalance(accountId, balance);
  }
  findOne(userId: number): Promise<Account> {
    return this.#repository.findOne(userId);
  }
  create(name: string, userId: number, balance: number): Promise<Account> {
    return this.#repository.create(name, userId, balance);
  }
  update(name: string, userId: number, balance?: number): Promise<Account> {
    return this.#repository.update(name, userId, balance);
  }
  destroy(userId: number): Promise<Account> {
    return this.#repository.destroy(userId);
  }
}
