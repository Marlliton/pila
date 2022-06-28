import { Transactions } from "@prisma/client";
import { TransactionRepository } from "./TransactionRepository";

export default class TransactionService implements TransactionRepository {
  #repo: TransactionRepository;
  constructor(repo: TransactionRepository) {
    this.#repo = repo;
  }
  destroyTransaction(transId: number): Promise<Transactions> {
    return this.#repo.destroyTransaction(transId);
  }
  updateTransaction(
    transId: number,
    description: string,
    type: "INCOME" | "OUTCOME",
    date: Date,
    value: number
  ): Promise<Transactions> {
    return this.#repo.updateTransaction(
      transId,
      description,
      type,
      date,
      value
    );
  }
  createTransaction(
    description: string,
    type: "OUTCOME" | "INCOME",
    date: Date,
    value: number,
    accountId: number
  ): Promise<Transactions> {
    return this.#repo.createTransaction(
      description,
      type,
      date,
      value,
      accountId
    );
  }
  findTransactions(userId: number): Promise<Transactions[]> {
    return this.#repo.findTransactions(userId);
  }
}
