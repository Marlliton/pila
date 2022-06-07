import { Accounts, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getAccountService } from "../models";

class AccountController {
  findAll = async (req: Request, res: Response) => {
    try {
      const list = await getAccountService().findAll();

      return res.status(200).json(list);
    } catch (error) {
      console.log(error);
    }
  };

  findOne = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const account = await getAccountService().findOne(+userId);
      if (!account) return res.status(204).send();
      res.status(200).json(account);
    } catch (error) {
      console.log(error);
    }
  };

  createAccount = async (req: Request, res: Response) => {
    const { name, userId } = req.body;

    if (!name || !userId)
      return res.status(403).json({ error: "Fill in all fields" });

    try {
      const account = await getAccountService().create({
        name,
        userId,
      } as Accounts);

      res.status(201).json(account);
    } catch (error) {
      console.log(error);
    }
  };

  update = async (req: Request, res: Response) => {
    const { name, userId } = req.body;

    if (!name || !userId)
      return res.status(403).json({ error: "Fill in all fields" });

    try {
      const hasAccount = await getAccountService().findOne(+userId);
      if (!hasAccount) return res.status(204).send();

      const account = await getAccountService().update({
        name,
        userId,
      } as Accounts);

      return res.status(200).json(account);
    } catch (error) {
      console.log(error);
    }
  };

  destroy = async (req: Request, res: Response) => {
    const { userId } = req.body;

    try {
      const hasAccount = await getAccountService().findOne(+userId);
      if (!hasAccount) return res.status(204).send();

      const account = await getAccountService().destroy(+userId);
      return res.status(200).json(account);
    } catch (error) {
      console.log(error);
    }
  };
}

export default new AccountController();
