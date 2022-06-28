import { PrismaClient, Transactions } from "@prisma/client";
import { TransactionRepository } from "../../models/transaction/TransactionRepository";
import { prisma } from "../../../prisma";

export default class TransactionPrisma implements TransactionRepository {
  #prisma: PrismaClient;
  constructor() {
    this.#prisma = prisma;
  }
  async updateTransaction(
    transId: number,
    description: string,
    type: "INCOME" | "OUTCOME",
    date: Date,
    value: number
  ): Promise<Transactions> {
    const transactionUpdated = await this.#prisma.transactions.update({
      where: {
        id: transId,
      },
      data: {
        description,
        value,
        type,
        date,
      },
    });
    return transactionUpdated!;
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
      // include: {
      //   account: {
      //     include: {
      //       transactions: true,
      //     },
      //   },
      // },
    });
    return transactions;
  }

  async destroyTransaction(transId: number): Promise<Transactions> {
    const transaction = await this.#prisma.transactions.delete({
      where: {
        id: transId,
      },
    });
    return transaction;
  }

  // TODO Validar se tem transação antes de fazer as operações no banco
  // async hasTransaction(transId: number) {
  //   const transaction = await this.#prisma.transactions.findUnique({
  //     where: {
  //       id: transId,
  //     },
  //   });

  //   return transaction ? true : false;
  // }
}
