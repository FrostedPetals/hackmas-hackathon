import bcrypt from "bcrypt";
import { pool } from "../db/index.js";
import { ApiError } from "../utils/Response.utils.js";
import { ApiResponse } from "../utils/Response.utils.js";
import crypto from "crypto"
//import dotenv from "dotenv";
import { verifyEmail } from "../utils/mailer.utils.js";

//dotenv.config();

const env = process.env.NODE_ENV || 'development';
if (env !== 'production') {
  await import('dotenv/config')
}


export async function handleSignup(req, res) {
    try {
        const { name, email, password } = req.body;

        if (name.trim() == '' || email.trim() == '' || password.trim() == '') {

            return ApiError(res, "All fields should be non-empty", "User not saved", 400)
        }
        const userExists = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (userExists.rows.length > 0) {
            console.log("user already exists")
            return ApiError(res, "User already exists", "Invalid req", 409)

        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = crypto.randomBytes(32).toString('hex')

        await pool.query(
            `INSERT INTO users (name, email, password,verification_token)
       VALUES ($1, $2, $3,$4)
       RETURNING id, name, email`,
            [name, email, hashedPassword, verificationToken]
        );
        try {
            await verifyEmail(email, verificationToken)
            return ApiResponse(res, "Signup successful", {}, 201)
        } catch (err) {
            console.error("Email sending error:", err);
            throw err
        }


    } catch (err) {
        console.error("Signup error:", err);
        return ApiError(res, "Internal server error", err.message, 500)
    }
}

export async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;


        if (!email?.trim() || !password?.trim())
            return ApiError(res, "All fields should be non-empty", "Enter all fields", 400);

        const result = await pool.query(
            "SELECT id, name, password, email, email_verified FROM users WHERE email = $1",
            [email]
        );
        if (result.rows.length === 0) {
            console.log("user not found")
            return ApiError(res, "User not found", "Invalid request", 401);
        }
        const user = result.rows[0];

        if (!user.email_verified) {
            return ApiError(res, "Email not verified", "Please verify your email first", 401);
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return ApiError(res, "Invalid credentials", "Unauthorized", 401);

        // set session as say some_random_session_number={userId:67, username:"Mia"} where cookie is set as 'sid= some_random_session_number'
        req.session.userId = user.id;
        req.session.username = user.name;
        req.session.email = user.email;

        return ApiResponse(res, "Login successful", { userId: user.id }, 200);
    } catch (err) {
        console.error("Login error:", err);
        return ApiError(res, "Internal server error", err.message, 500);
    }
}



export async function handleLogout(req, res) {
    try {
        // Destroy server-side session
        req.session.destroy((err) => {
            if (err) {
                console.error("Logout error:", err);
                return ApiError(res, "Logout failed", err.message, 500);
            }

            // Tell browser to remove cookie
            res.cookie("sid", "", {
                maxAge: 0,                  // expire immediately
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
            });

            return ApiResponse(res, "Logout successful", {}, 200);
        });
    } catch (err) {
        console.error("Logout exception:", err);
        return ApiError(res, "Internal server error", err.message, 500);
    }
}