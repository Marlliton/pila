import express, { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {});
router.get("/:userId", (req: Request, res: Response) => {});
router.post("/", (req: Request, res: Response) => {});
router.put("/:userId", (req: Request, res: Response) => {});
router.delete("/:userId", (req: Request, res: Response) => {});

export default (app: express.Application) => app.use("/users", router);
