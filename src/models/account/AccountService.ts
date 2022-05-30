import { Accounts } from "@prisma/client";
import { AccountRepository } from "./AccountRepository";

export default class AccountService implements AccountRepository {
  #repository: AccountRepository;
  constructor(repo: AccountRepository) {
    this.#repository = repo;
  }
  findAll(): Promise<Accounts[]> {
    return this.#repository.findAll();
  }
  findOne(accountId: number): Promise<Accounts> {
    return this.#repository.findOne(accountId);
  }
  create(account: Accounts): Promise<Accounts> {
    return this.#repository.create(account);
  }
  update(accountId: number, account: Accounts): Promise<Accounts> {
    return this.#repository.update(accountId, account);
  }
  destroy(accountId: number): Promise<Accounts> {
    return this.#repository.destroy(accountId);
  }
}
