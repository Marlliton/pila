import { Router } from "express";
import accountRouter from "./accountsRouters";
import userRouters from "./userRouters";

const router = Router();

router.use("/users", userRouters);
router.use("/accounts", accountRouter);

export default router;
