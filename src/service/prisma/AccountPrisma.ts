import { Account, PrismaClient } from "@prisma/client";
import { AccountRepository } from "../../models/account/AccountRepository";
import { prisma } from "../../../prisma";

export default class AccountPrisma implements AccountRepository {
  #prisma: PrismaClient;
  constructor() {
    this.#prisma = prisma;
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

  async create({ total, userId }: Account): Promise<Account> {
    const account = await this.#prisma.account.create({
      data: {
        total,
        userId,
      },
    });
    return account;
  }

  async update({ total, userId }: Account): Promise<Account> {
    const updatedAccount = await this.#prisma.account.update({
      where: {
        userId,
      },
      data: {
        total,
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
