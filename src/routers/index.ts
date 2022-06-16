import { Router } from "express";
import accountRouter from "./accountsRouters";
import userRouters from "./userRouters";
import auth from "./auth";
import transactionRouter from "./transactionRoutes";

const router = Router();

router.use("/users", userRouters);
router.use("/accounts", accountRouter);
router.use("/auth", auth);
router.use("/transaction", transactionRouter);

export default router;
