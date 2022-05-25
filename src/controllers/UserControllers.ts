import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

class UserController {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  
  findAll = async (req: Request, res: Response) => {
    const users = await this.prisma.user.findMany();
    if (!users) return res.status(204).send();
    const userList = [...users];
    userList.map((user: any) => (user.password = undefined));
    return res.status(200).json(userList);
  };

  findOne = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const user = await this.getUserById(+userId);
    if (!user) return res.status(204).send();
    const newUser: any = { ...user };
    newUser.password = undefined;

    return res.status(200).json(newUser);
  };

  create = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(403).json({ error: "Fill in all fields" });

    const hasUser = await this.getUserByUniqueEmail(email);

    if (hasUser) return res.status(403).json({ error: "User already exist" });

    const encryptedPass = bcrypt.hashSync(password, 8);
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: encryptedPass,
      },
    });

    const newUser: any = { ...user };
    newUser.password = undefined;

    return res.status(201).json(newUser);
  };

  update = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, email } = req.body;

    if (!name || !email)
      return res.status(403).json({ error: "Fill in all fields" });

    const hasUser = await this.getUserById(+userId);
    if (!hasUser) return res.status(204).send();

    const user = await this.prisma.user.update({
      where: {
        id: +userId,
      },
      data: {
        name,
        email,
      },
    });

    user && (user.password = "undefined");

    return res.status(200).json(user);
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

    user && (user.password = "undefined");
    return res.status(200).json(user);
  };

  getUserByUniqueEmail = async (email: string) => {
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
