import { Request, Response } from "express";
import { prisma, PrismaClient } from "@prisma/client";

class UserController {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  findAll = async (req: Request, res: Response) => {
    const users = await this.prisma.user.findMany();
    return users ? res.status(200).json(users) : res.status(204).send();
  };

  findOne = async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "Id field is missing" });

    const user = await this.getUserById(+userId);

    return user ? res.status(200).json(user) : res.status(204).send();
  };

  create = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(403).json({ error: "Fill in all fields" });

    const hasUser = await this.getUserByUniqueEmail(email);

    if (hasUser) return res.status(403).json({ error: "User already exist" });

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return res.status(201).json(user);
  };

  update = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, email } = req.body;

    const hasUser = await this.getUserById(+userId);
    if (!hasUser) return res.status(204).send();

    const newUser = await this.prisma.user.update({
      where: {
        id: +userId,
      },
      data: {
        name,
        email,
      },
    });

    return res.status(200).json(newUser);
  };

  destroy = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const hasUser = await this.getUserById(+userId);
    if (!hasUser) return res.status(204).send();

    const user = await this.prisma.user.delete({
      where: {
        id: +userId,
      },
    });

    return res
      .status(200)
      .json({ user: { id: user.id, name: user.name, email: user.email } });
  };

  private getUserByUniqueEmail = async (email: string) => {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user ?? null;
  };

  private getUserById = async (id: number) => {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user ?? null;
  };
}

export default new UserController();
