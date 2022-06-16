import { Router } from "express";
import AccountController from "../controllers/AccountController";
import validateToken from "../middlewares/authMiddleware";

const accountRouter = Router();

accountRouter.get("/:accountId", validateToken, AccountController.findOne);
accountRouter.post("/", validateToken, AccountController.createAccount);
accountRouter.put("/:accountId", validateToken, AccountController.update);
accountRouter.delete("/:accountId", validateToken, AccountController.destroy);

export default accountRouter;
