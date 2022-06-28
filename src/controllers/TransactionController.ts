import { Request, Response } from "express";
import { getAccountService, getTransactionService } from "../models";

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
    let { description, type, date, value, accountId } = req.body;
    if (!description || !type || !date || !value || !accountId)
      return res.status(400).send();

    if ((type == "OUTCOME" && value > 0) || (type == "INCOME" && value < 0)) {
      value *= -1;
    }

    try {
      const { balance } = await getAccountService().getBalance(accountId);
      if (balance + value <= 0) {
        res.status(400).json({ error: "Invalid value" });
      }

      // TODO Resolver a parte de saldo do usuário
      console.log(Number(balance) + Number(value));
      await getAccountService().updateBalance(accountId, value);
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
    const { description, type, date, value } = req.body;
    const { transId } = req.params;
    if (!description || !type || !date || !value || !transId)
      return res.status(204).send();

    try {
      const transaction = await getTransactionService().updateTransaction(
        +transId,
        description,
        type,
        date,
        value
      );

      return res.status(200).json(transaction);
    } catch (error) {
      console.log(
        "🚀 ~ file: TransactionController.ts ~ line 60 ~ TransactionController ~ updateTransaction= ~ error",
        error
      );
    }
  };

  destroyTransaction = async (req: Request, res: Response) => {
    const { transId } = req.params;
    if (!transId) return res.status(204).send();

    try {
      const transaction = await getTransactionService().destroyTransaction(
        +transId
      );
      res.status(200).json(transaction);
    } catch (error) {
      console.log(
        "🚀 ~ file: TransactionController.ts ~ line 78 ~ TransactionController ~ destroyTransaction= ~ error",
        error
      );
    }
  };
}

export default new TransactionController();
