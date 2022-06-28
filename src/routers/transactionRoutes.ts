import { Router } from "express";
import TransactionController from "../controllers/TransactionController";
import validateToken from "../middlewares/authMiddleware";
import { getTransactionService, getUserService } from "../models";

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
  "/:transId",
  validateToken,
  TransactionController.updateTransaction
);
transactionRouter.delete(
  "/:transId",
  validateToken,
  TransactionController.destroyTransaction
);

export default transactionRouter;
