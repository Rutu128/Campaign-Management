import prisma from "../utils/prismClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const register = async (req, res) => {
    try {
        const { firstName, lastName, panNumber, email, phone, password } =
            req.body;

        // Check if all fields are present
        if (
            !firstName ||
            !lastName ||
            !panNumber ||
            !email ||
            !phone ||
            !password
        ) {
            return res
                .status(400)
                .json(
                    new ApiError(400, "All fields are required", [
                        { msg: "All fields are required" },
                    ])
                );
        }
        // Check if user already exists
        const user = await prisma.user.findUnique({
            where: {
                email,
                panNumber,
            },
        });

        if (user) {
            return res
                .status(400)
                .json(
                    new ApiError(400, "User already exists", [
                        { msg: "User already exists" },
                    ])
                );
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                panNumber,
                email,
                phone,
                password: hashedPassword,
            },
        });

        // Generate JWT token
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Remove password from response
        delete newUser.password;
        const options = {
            // httpOnly: true,
            // secure: true,
            // sameSite: "strict",
            maxAge: 604800000,
        };

        res.cookie("token", token, options);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { token, user: { ...newUser, password: undefined } },
                    "User registered successfully"
                )
            );
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiError(500, "Internal Server Error", err));
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //If User exists or not
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res
                .status(401)
                .json(new ApiError(401, "Invalid credentials"));
        }
        //If password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json(new ApiError(401, "Invalid credentials"));
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        const options = {
            // httpOnly: true,
            // secure: true,
            // sameSite: "strict",
            maxAge: 604800000,
        };
        res.cookie("token", token, options);
        // Remove password from response
        delete user.password;
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { token, user: { ...user, password: undefined } },
                    "User logged in successfully"
                )
            );
    } catch (err) {
        console.log(err);
        res.status(500).json(new ApiError(500, "Internal Server Error", err));
    }
};

const ping = async (req, res) => {
    try {
        const user = req.user;

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { ...user, password: undefined },
                    "User authenticated"
                )
            );
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(new ApiError(500, "Internal server Error", err));
    }
};

export { register, login, ping };
