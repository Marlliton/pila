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
    const { accountId } = req.params;
    try {
      const account = await getAccountService().findOne(+accountId);
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
    const { accountId } = req.params;
    const { name, userId } = req.body;

    if (!name || !userId)
      return res.status(403).json({ error: "Fill in all fields" });

    try {
      const hasAccount = await getAccountService().findOne(+accountId);
      if (!hasAccount) return res.status(204).send();

      const account = await getAccountService().update(+accountId, {
        name,
        userId,
      } as Accounts);

      res.status(200).json(account);
    } catch (error) {
      console.log(error);
    }
  };

  destroy = async (req: Request, res: Response) => {
    const { accountId } = req.params;

    try {
      const hasAccount = await getAccountService().findOne(+accountId);
      if (!hasAccount) return res.status(204).send();

      const account = await getAccountService().destroy(+accountId);
      res.status(200).json(account);
    } catch (error) {}
  };
}

export default new AccountController();
