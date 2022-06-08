import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenProps {
  id: string;
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

    // TODO verificar o motivo do params não está sendo atualizado
    // req.params.userId = (decode as TokenProps).id;
  
    req.body = {
      userId: (decode as TokenProps).id,
      ...req.body,
    };
    return next();
  });
}

export default validateToken;
