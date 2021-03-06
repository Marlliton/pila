import { Transactions } from "@prisma/client";

export interface TransactionRepository {
  createTransaction: (
    description: string,
    type: "OUTCOME" | "INCOME",
    date: Date,
    value: number,
    accountId: number
  ) => Promise<Transactions>;
  findTransactions: (userId: number) => Promise<Transactions[]>;
  updateTransaction: (
    transId: number,
    description: string,
    type: "OUTCOME" | "INCOME",
    date: Date,
    value: number
  ) => Promise<Transactions>;
  destroyTransaction: (transId: number) => Promise<Transactions>;
}
