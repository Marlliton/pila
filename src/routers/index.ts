import { Router } from "express";
import accountRouter from "./accountsRouters";
import userRouters from "./userRouters";
import auth from "./auth";

const router = Router();

router.use("/users", userRouters);
router.use("/accounts", accountRouter);
router.use("/auth", auth);

export default router;
