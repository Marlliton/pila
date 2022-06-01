import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();
router.post("/signing", AuthController.signing);
router.post("/signup", AuthController.signup);

export default router;
