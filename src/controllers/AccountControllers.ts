import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

class AccountController {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  findAll = async (req: Request, res: Response) => {
    const list = await this.prisma.accounts.findMany();
    return res.status(200).json(list);
  };

  findOne = async (req: Request, res: Response) => {
    const { accountId } = req.params;
    const account = await this.prisma.accounts.findUnique({
      where: {
        id: +accountId,
      },
    });

    if (!account) return res.status(204).send();

    res.status(200).json(account);
  };

  createAccount = async (req: Request, res: Response) => {
    const { name, userId } = req.body;
    const account = await this.prisma.accounts.create({
      data: {
        name,
        userId,
      },
    });

    return res.status(201).json(account);
  };
}

export default new AccountController();
