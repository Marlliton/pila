import express, { Request, Response, Router } from "express";
import UserController from "../controllers/UserControllers";

const router = Router();

router.get("/", UserController.findAll);
router.get("/:userId", UserController.findOne);
router.post("/", UserController.create);
router.put("/:userId", UserController.update);
router.delete("/:userId", UserController.destroy);

export default (app: express.Application) => app.use("/users", router);
