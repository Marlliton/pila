import "dotenv/config";
import express, { json, Request, Response } from "express";
import userRouter from "./routers/userRouters";

const app = express();
app.use(json());
userRouter(app);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send();
});

export default app;
