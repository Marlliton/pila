import { Request, Response } from "express";
import { getTransactionService } from "../models";

class TransactionController {
  findTransactions = async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userId) return res.status(204).send();
    try {
      const transactions = await getTransactionService().findTransactions(
        +userId
      );
      return res.status(200).json(transactions);
    } catch (error) {
      console.log(
        "🚀 ~ file: TransactionController.ts ~ line 14 ~ TransactionController ~ findTransactions= ~ error",
        error
      );
    }
  };

  createTransaction = async (req: Request, res: Response) => {
    const { description, type, date, value, accountId } = req.body;
    if (!description || !type || !date || !value || !accountId)
      return res.status(204).send();

    try {
      const transaction = await getTransactionService().createTransaction(
        description,
        type,
        date,
        value,
        accountId
      );

      return res.status(200).json(transaction);
    } catch (error) {
      console.log(
        "🚀 ~ file: TransactionController.ts ~ line 28 ~ TransactionController ~ createTransaction= ~ error",
        error
      );
    }
  };

  updateTransaction = async (req: Request, res: Response) => {
    const { description, type, date, value, accountId } = req.body;
    if (!description || !type || !date || !value || !accountId)
      return res.status(204).send();

    try {
      const transaction = await getTransactionService().updateTransaction(
        description,
        type,
        date,
        value,
      );

      return res.status(200).json(transaction);
    } catch (error) {
    console.log("🚀 ~ file: TransactionController.ts ~ line 60 ~ TransactionController ~ updateTransaction= ~ error", error)
      
    }
  };
}

export default new TransactionController();
