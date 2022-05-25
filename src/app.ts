import "dotenv/config";
import express, { json, Request, Response } from "express";
import router from "./routers/index";

const app = express();
app.use(json());
app.use(router);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send();
});

export default app;
