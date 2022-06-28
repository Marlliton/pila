import { Account, PrismaClient } from "@prisma/client";
import { AccountRepository } from "../../models/account/AccountRepository";
import { prisma } from "../../../prisma";

export default class AccountPrisma implements AccountRepository {
  #prisma: PrismaClient;
  constructor() {
    this.#prisma = prisma;
  }

  async create(
    name: string,
    userId: number,
    balance: number
  ): Promise<Account> {
    const account = await this.#prisma.account.create({
      data: {
        balance,
        name,
        userId,
      },
    });

    return account;
  }

  async findAll(): Promise<Account[]> {
    const account = await this.#prisma.account.findMany();
    return account;
  }

  async findOne(userId: number): Promise<Account> {
    const account = await this.#prisma.account.findUnique({
      where: {
        userId,
      },
    });
    return account!;
  }

  async getBalance(accountId: number): Promise<any> {
    const balance = await this.#prisma.account.findUnique({
      where: {
        id: accountId,
      },
      select: {
        balance: true,
      },
    });

    return balance;
  }

  async updateBalance(accountId: number, balance: number): Promise<void> {
    await this.#prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        balance,
      },
    });
  }

  async update(name: string, userId: number): Promise<Account> {
    const updatedAccount = await this.#prisma.account.update({
      where: {
        userId,
      },
      data: {
        name,
        userId,
      },
    });
    return updatedAccount;
  }

  async destroy(userId: number): Promise<Account> {
    const account = await this.#prisma.account.delete({
      where: {
        userId,
      },
    });
    return account;
  }
}
