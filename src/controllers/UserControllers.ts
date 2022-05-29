import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { getUserService } from "../models";

class UserController {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  findAll = async (req: Request, res: Response) => {
    try {
      const users = await getUserService().findAll();
      users.map((user: any) => (user.password = undefined));

      return users ? res.status(200).json(users) : res.status(204).send();
    } catch (error) {
      console.log(error);
    }
  };

  findOne = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const user = await getUserService().findOne(+userId);

      if (!user) return res.status(204).send();
      const userWithoutPass: any = { ...user };
      userWithoutPass.password = undefined;

      return res.status(200).json(userWithoutPass);
    } catch (error) {
      console.log(error);
    }
  };

  create = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(403).json({ error: "Fill in all fields" });

    try {
      const hasUser = await getUserService().verifyUserExists(email);
      if (hasUser) return res.status(403).json({ error: "User already exist" });

      const user = await getUserService().create({
        email,
        name,
        password,
      } as User);

      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
    }
  };

  update = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, email } = req.body;

    if (!name || !email)
      return res.status(403).json({ error: "Fill in all fields" });

    try {
      const hasUser = await getUserService().verifyUserExists(email);
      if (!hasUser) return res.status(204).send();
      const user = await getUserService().update(+userId, {
        name,
        email,
      } as User);

      const userWithoutPass: any = { ...user };
      userWithoutPass.password = undefined;

      return res.status(200).json(userWithoutPass);
    } catch (error) {
      console.log(error);
    }
  };

  destroy = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const hasUser = await getUserService().findOne(+userId);
      if (!hasUser) return res.status(204).send();

      const user = await getUserService().destroy(+userId);
      const userWithoutPass: any = { ...user };
      userWithoutPass.password = undefined;

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  };
}

export default new UserController();
