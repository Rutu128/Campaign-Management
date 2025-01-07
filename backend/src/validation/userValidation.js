import { z } from "zod";

const registerSchema = z.object({
    email: z.string().email("Invalid email format."),
    firstName: z.string().min(1, "First name cannot be empty."),
    lastName: z.string().min(1, "Last name cannot be empty."),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long.")
        .regex(/[A-Za-z]/, "Password must include at least one letter.")
        .regex(/[0-9]/, "Password must include at least one number."),
    role: z.enum(["USER", "ADMIN"]).default("USER"), // Assuming roles are USER and ADMIN
    panNumber: z
        .string()
        .regex(
            /^[A-Z]{5}[0-9]{4}[A-Z]$/,
            "PAN Card number must match the format [A-Z]{5}[0-9]{4}[A-Z}."
        ),
    phone: z.string().optional(), // Optional, add validations if needed
});

const loginSchema = z.object({
    email: z.string().email("Invalid email format."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
});

export { registerSchema, loginSchema };
