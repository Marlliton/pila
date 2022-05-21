import express, { Router } from "express";
import AccountController from "../controllers/AccountControllers";

const router = Router();

router.get("/", AccountController.findAll);
router.get("/:accountId", AccountController.findOne);
router.post("/", AccountController.createAccount);

export default (app: express.Application) => app.use("/accounts", router);
