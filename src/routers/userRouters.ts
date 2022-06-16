import { Router } from "express";
import UserController from "../controllers/UserController";
import validateToken from "../middlewares/authMiddleware";

const userRouters = Router();

// userRouters.use(validateToken);

// userRouters.get("/", UserController.findAll);
userRouters.get("/:userId", validateToken ,UserController.findOne);
// userRouters.post("/", UserController.create);
userRouters.put("/:userId", validateToken ,UserController.update);
userRouters.delete("/:userId", validateToken ,UserController.destroy);

export default userRouters;
