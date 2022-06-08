import { Router } from "express";
import AccountController from "../controllers/AccountController";
import validateToken from "../middlewares/authMiddleware";

const accountRouter = Router();

accountRouter.use(validateToken);

accountRouter.get("/:accountId", AccountController.findOne);
accountRouter.post("/", AccountController.createAccount);
accountRouter.put("/:accountId", AccountController.update);
accountRouter.delete("/:accountId", AccountController.destroy);

export default accountRouter;
