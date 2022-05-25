import { Request, Response, Router } from "express";
import UserController from "../controllers/UserControllers";

const userRouters = Router();

userRouters.get("/", UserController.findAll);
userRouters.get("/:userId", UserController.findOne);
userRouters.post("/", UserController.create);
userRouters.put("/:userId", UserController.update);
userRouters.delete("/:userId", UserController.destroy);

export default userRouters;
