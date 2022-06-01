import { Router } from "express";
import UserController from "../controllers/UserController";
import validateToken from "../middlewares/authMiddleware";

const userRouters = Router();

userRouters.use(validateToken);

userRouters.get("/", UserController.findAll);
userRouters.get("/:userId", UserController.findOne);
userRouters.post("/", UserController.create);
userRouters.put("/:userId", UserController.update);
userRouters.delete("/:userId", UserController.destroy);

export default userRouters;
