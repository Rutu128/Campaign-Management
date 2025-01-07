import { Router } from "express";
import { register, login, ping } from "../controllers/Auth.controller.js";
import {
    validateLogin,
    validateRegister,
} from "../middlewares/validation.middleware.js";
import isAuthenticated from "../middlewares/Authentication.middleware.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/ping",isAuthenticated,ping)

export default router;
