import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenProps {
  id: string;
  name: string;
  email: string;
}

function validateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provider" });
  const parts = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).json({ error: "Token error" });

  const [bearer, token] = parts;
  if (!/^Bearer$/i.test(bearer))
    return res.status(401).json({ error: "Token badly formatted" });

  jwt.verify(token, process.env.SECRET_KEY!, (err, decode) => {
    if (err) return res.status(401).json({ error: "Token invalid" });

    req.body = {
      id: (decode as TokenProps).id,
      name: (decode as TokenProps).name,
      email: (decode as TokenProps).email,
    };
    return next();
  });
}

export default validateToken;
