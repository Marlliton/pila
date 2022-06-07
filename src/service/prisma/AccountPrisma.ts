import { Accounts, PrismaClient } from "@prisma/client";
import { AccountRepository } from "../../models/account/AccountRepository";
import { prisma } from "../../../prisma";

export default class AccountPrisma implements AccountRepository {
  #prisma: PrismaClient;
  constructor() {
    this.#prisma = prisma;
  }

  async findAll(): Promise<Accounts[]> {
    const accounts = await this.#prisma.accounts.findMany();
    return accounts;
  }

  async findOne(userId: number): Promise<Accounts> {
    const account = await this.#prisma.accounts.findUnique({
      where: {
        userId,
      },
    });
    return account!;
  }

  async create({ name, userId }: Accounts): Promise<Accounts> {
    const account = await this.#prisma.accounts.create({
      data: {
        name,
        userId,
      },
    });
    return account;
  }

  async update({ name, userId }: Accounts): Promise<Accounts> {
    const updatedAccount = await this.#prisma.accounts.update({
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

  async destroy(userId: number): Promise<Accounts> {
    const account = await this.#prisma.accounts.delete({
      where: {
        userId,
      },
    });
    return account;
  }
}
