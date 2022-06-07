import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../../../prisma";
import { UserRepository } from "../../models/user/UserRepository";

export default class UserPrisma implements UserRepository {
  #prisma: PrismaClient;
  constructor() {
    this.#prisma = prisma;
  }
  async verifyUserExists(userId: number): Promise<boolean> {
    const user = await this.#prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    
    return user ? true : false;
  }

  async findAll(): Promise<User[]> {
    const users = await this.#prisma.user.findMany();
    return users;
  }

  async findOne(userId: number): Promise<User> {
    const user = await this.#prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user!;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.#prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user!;
  }

  async create({ name, email, password }: User): Promise<User> {
    const encryptedPass = bcrypt.hashSync(password, 8);

    const user = await this.#prisma.user.create({
      data: {
        name,
        email,
        password: encryptedPass,
      },
    });

    return user;
  }

  async update(userId: number, { name, email }: User): Promise<User> {
    const userUpdated = await this.#prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
      },
    });
    return userUpdated;
  }
  async destroy(userId: number): Promise<User> {
    const user = await this.#prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
