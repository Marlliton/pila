import { PrismaClient, Transactions } from "@prisma/client";
import { TransactionRepository } from "../../models/transaction/TransactionRepository";
import { prisma } from "../../../prisma";

export default class TransactionPrisma implements TransactionRepository {
  #prisma: PrismaClient;
  constructor() {
    this.#prisma = prisma;
  }
  async createTransaction(
    description: string,
    type: "OUTCOME" | "INCOME",
    date: Date,
    value: number,
    accountId: number
  ): Promise<Transactions> {
    const transaction = await this.#prisma.transactions.create({
      data: {
        description,
        type,
        date,
        value,
        accountId,
      },
    });
    return transaction;
  }

  async findTransactions(userId: number): Promise<Transactions[]> {
    const transactions = await this.#prisma.transactions.findMany({
      where: {
        account: {
          userId,
        },
      },
      include: {
        account: {
          include: {
            transactions: true
          }
        }
      },
    });
    return transactions;
  }
}
