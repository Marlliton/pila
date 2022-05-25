import { Router } from "express";
import AccountController from "../controllers/AccountControllers";

const accountRouter = Router();

accountRouter.get("/", AccountController.findAll);
accountRouter.get("/:accountId", AccountController.findOne);
accountRouter.post("/", AccountController.createAccount);
accountRouter.put("/:accountId", AccountController.update);
accountRouter.delete("/:accountId", AccountController.destroy);

export default accountRouter;
