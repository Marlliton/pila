import { Account } from "@prisma/client";
import { AccountRepository } from "./AccountRepository";

export default class AccountService implements AccountRepository {
  #repository: AccountRepository;
  constructor(repo: AccountRepository) {
    this.#repository = repo;
  }
  findOne(userId: number): Promise<Account> {
    return this.#repository.findOne(userId);
  }
  create(account: Account): Promise<Account> {
    return this.#repository.create(account);
  }
  update(account: Account): Promise<Account> {
    return this.#repository.update(account);
  }
  destroy(userId: number): Promise<Account> {
    return this.#repository.destroy(userId);
  }
}
