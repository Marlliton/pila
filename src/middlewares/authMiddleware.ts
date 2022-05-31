import { NextFunction, Request, Response } from "express";

function validateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provider" });
  return next();
}

export default validateToken;
