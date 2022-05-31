import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { getUserService } from "../models";

class AuthController {
  signing = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(401).json({ message: "there are empty fields" });
    try {
      const user = await getUserService().findByEmail(email);
      if (!user) return res.status(204).json({ message: "User not found" });
      const isCorrectPass = bcrypt.compareSync(password, user.password);
      if (!isCorrectPass)
        return res.status(401).json({ message: "Invalid password or email" });

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.SECRET_KEY!, {
        expiresIn: 60 * 60 * 8 // 8 hours
      });
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
    }
  };
}

export default new AuthController();
