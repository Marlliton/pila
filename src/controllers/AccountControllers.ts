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

    if (!name || !userId)
      return res.status(403).json({ error: "Fill in all fields" });

    const account = await this.prisma.accounts.create({
      data: {
        name,
        userId,
      },
    });

    return res.status(201).json(account);
  };

  update = async (req: Request, res: Response) => {
    const { accountId } = req.params;
    const { name, userId } = req.body;

    if (!name || !userId)
      return res.status(403).json({ error: "Fill in all fields" });

    const hasAccount = await this.prisma.accounts.findUnique({
      where: {
        id: +accountId,
      },
    });

    if (!hasAccount) return res.status(204).send();

    const newAccount = await this.prisma.accounts.update({
      where: {
        id: +accountId,
      },
      data: {
        name,
        userId,
      },
    });

    return res.status(200).json(newAccount);
  };

  destroy = async (req: Request, res: Response) => {
    const { accountId } = req.params;

    const hasAccount = await this.prisma.accounts.findUnique({
      where: {
        id: +accountId,
      },
    });

    if (!hasAccount) return res.status(204).send();

    const account = await this.prisma.accounts.delete({
      where: {
        id: +accountId,
      },
    });

    return res.status(200).json({ id: account.id, name: account.name });
  };
}

export default new AccountController();
