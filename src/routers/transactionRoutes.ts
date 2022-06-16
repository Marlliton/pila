import { Router } from "express";
import TransactionController from "../controllers/TransactionController";
import validateToken from "../middlewares/authMiddleware";

const transactionRouter = Router();

transactionRouter.get(
  "/:userId",
  validateToken,
  TransactionController.findTransactions
);
transactionRouter.post(
  "/",
  validateToken,
  TransactionController.createTransaction
);
transactionRouter.put(
  "/",
  validateToken,
  TransactionController.updateTransaction
);

export default transactionRouter;
