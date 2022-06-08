import { User } from "@prisma/client";
import { Request, Response } from "express";
import { getUserService } from "../models";

// TODO verificar se o parâmetro que está vindo é igual a o id do cara logado
class UserController {
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

  update = async (req: Request, res: Response) => {
    // TODO params não está com o valor atualizado
    // const { userId } = req.params;
    const { name, email, userId } = req.body;

    if (!name || !email)
      return res.status(401).json({ error: "Fill in all fields" });

    try {
      const hasUser = await getUserService().findOne(+userId);
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
