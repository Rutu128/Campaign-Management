import { ApiError } from "../utils/ApiError.js";
import { registerSchema, loginSchema } from "../validation/userValidation.js";

const validateRegister = (req, res, next) => {
    try {
        registerSchema.parse(req.body);
        next();
    } catch (err) {
        console.log("Validation error: " + err);
        return res.status(400).json(new ApiError(400, "Validation error", err));
    }
};

const validateLogin = (req, res, next) => {
    try {
        loginSchema.parse(req.body);
        next();
    } catch (err) {
        console.log("Validation error: " + err);
        return res.status(400).json(new ApiError(400, "Validation error", err));
    }
};
export { validateRegister,validateLogin };
