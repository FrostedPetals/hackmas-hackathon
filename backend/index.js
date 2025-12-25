import express from "express";
import cors from "cors"
import session from "express-session";
import multer from "multer";
import pgSession from "connect-pg-simple"
import { pool } from "./db/index.js";
import { handleLogin,handleSignup,handleLogout } from "./controllers/auth.controllers.js";
import requireLogin from "./middlewares/requireLogin.js";
import { ApiError, ApiResponse } from "./utils/Response.utils.js";
import {GoogleGenAI} from '@google/genai';

import rateLimit from 'express-rate-limit';


const env = process.env.NODE_ENV || 'development';
if (env !== 'production') {
  await import('dotenv/config')
}

//dotenv.config();
const app=express()

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";
const BACKEND_URL = process.env.BACKEND_URL || `http://${HOST}:${PORT}`;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});



const userQuotaLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, //1 hr window
  max: 2, // Limit each user to 2 summaries per hour
  keyGenerator: (req) => req.session.userId || req.ip, // Limits by User ID instead of just IP
  message: { 
    error: "User Quota Exceeded", 
    message: "You can only summarize 2 notes per hour." 
  },
  standardHeaders: true, 
  legacyHeaders: false,
});
// to enable requests with json and urlencoded payloads
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//logging
app.use((req,res,next)=>{
  console.log(`[${new Date().toISOString}]: ${req.method}
  ${req.url} ${JSON.stringify(req.body)}`)
  next()
})

//very-important to initialize cors and allow credentials so that cookies can be sent between frontend and backend
app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true,
}));

const PgSession = pgSession(session);

app.set("trust proxy", 1); //imp for Render

app.use(session({
  store: new PgSession({
    pool: pool,
    tableName: "session_data",
    pruneSessionInterval: 15*60 // expired sessions removed from DB every 15 min
  }),

  name: "sid", // cookie name

  secret: process.env.SESSION_SECRET, //for mix-and-mash hashing

  resave: false,
  saveUninitialized: false,

  cookie: {
    httpOnly: true,
    maxAge: 5 * 60 * 60 * 1000, // 5 hours
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production"?"none": "lax",
  },
}));

//define routes

app.post('/api/signup',(req,res)=>{
  handleSignup(req,res);
})

app.post('/api/login',(req,res)=>{
  handleLogin(req,res);
})

app.post('/api/logout',(req,res)=>{
  handleLogout(req,res);
})

app.get("/api/me", async (req, res) => {
  if (!req.session || !req.session.userId) {
    return ApiError(res, "Not logged in", { loggedIn: false }, 401);
  }

  const result = await pool.query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [req.session.userId]
  );

  if (result.rows.length === 0) {
    
    req.session.destroy(() => {}); //imp?
    return ApiError(res, "User not found", "Invalid session", 401);
  }

  return ApiResponse(res, "Logged in", {
    loggedIn: true,
    user: {
      id: result.rows[0].id,
      name: result.rows[0].name,
      email:result.rows[0].email
    }
  });
});


app.get("/api/calendar", requireLogin, async (req, res) => {
  try {
    const userId = req.session.userId;
    const day = req.query.day ? parseInt(req.query.day) : null;

    let result;

    if (!day) {
      // fetch all events
      result = await pool.query(
        `SELECT id, title, description,event_date::date AS event_date
         FROM calendar_events
         WHERE user_id = $1
         ORDER BY event_date ASC`,
        [userId]
      );
    } else {
      // fetch events within the next 'day' days
      result = await pool.query(
        `SELECT id, title, description,event_date::date AS event_date
         FROM calendar_events
         WHERE user_id = $1 AND event_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '1 day' * $2
         ORDER BY event_date ASC`,
        [userId, day]
      );
    }

    return ApiResponse(res, "Fetched events", result.rows);
  } catch (err) {
    console.error(err);
    return ApiError(res, "Events were not fetched properly", "Retry", 500);
  }
});


app.post("/api/calendar", requireLogin, async (req, res) => {
  try {
    const userId = req.session.userId;
    const { title, description, event_date } = req.body;

    if (!title || !event_date) {
      return ApiError(res, "Title and date are required", "Fix input", 400);
    }

    const result = await pool.query(
      `INSERT INTO calendar_events
       (user_id, title, description, event_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, title, description, event_date]
    );

    return ApiResponse(res, "Event created", result.rows[0]);
  } catch (err) {
    console.error(err);
    return ApiError(res, "Event not created", "Retry", 500);
  }
});

app.delete("/api/calendar/:id", requireLogin, async (req, res) => {
  try {
    const userId = req.session.userId;
    const eventId = req.params.id;

    const result = await pool.query(
      `DELETE FROM calendar_events
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [eventId, userId]
    );

    if (result.rowCount === 0) {
      return ApiError(res, "Event not found", "Invalid ID", 404);
    }

    return ApiResponse(res, "Event deleted", result.rows[0]);
  } catch (err) {
    console.error(err);
    return ApiError(res, "Event not deleted", "Retry", 500);
  }
});

app.get("/api/verify-email", async (req, res) => {
  try {
    const rawToken = req.query.token;
    if (!rawToken) {
      return ApiError(res, "Missing token", "Verification failed", 400);
    }

    const token = decodeURIComponent(rawToken);

    const check = await pool.query(
      "SELECT id FROM users WHERE verification_token = $1",
      [token]
    );

    console.log("Token match count:", check.rows.length);

    if (check.rows.length === 0) {
      return ApiError(res, "Invalid token", "Verification failed", 400);
    }

    await pool.query(
      `
      UPDATE users
      SET email_verified = true,
          verification_token = NULL
      WHERE verification_token = $1
      `,
      [token]
    );

    return ApiResponse(res, "Email verified successfully", { verified: true });
  } catch (err) {
    console.error("Verify error:", err);
    return ApiError(res, "Server error", err.message, 500);
  }
});


app.use("/api/notes", requireLogin, async (req, res) => {
  try {
    const userId = req.session.userId;
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [userId]
    );
    return ApiResponse(res, "User profile fetched", result.rows[0], 200);
  } catch (err) {
    console.error(err);
    return ApiError(res, "Some error occurred", err.message, 500);
  }
});



app.use("/api/tree", requireLogin, async (req, res) => {
  try {
    const userId = req.session.userId;
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [userId]
    );
    return ApiResponse(res, "User profile fetched", result.rows[0], 200);
  } catch (err) {
    console.error(err);
    return ApiError(res, "Some error occurred", err.message, 500);
  }
});

const upload = multer({
  storage: multer.memoryStorage(),
});

//imp
app.post("/api/summarize", requireLogin,userQuotaLimiter, upload.array("pics",5), async (req,res)=>{
  try{
    if (!req.files || req.files.length === 0){
      return ApiError(res,"Upload at least 1 image","Summarization canceled",400);
    }

    const contents = req.files.map(file => ({
      inlineData: {
        mimeType: file.mimetype,
        data: file.buffer.toString("base64")
      }
    }));

    // Add instruction as text
    contents.push({
      text: "Please read these handwritten notes and summarize them."
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    const summary = response.text || "No summary returned";

    return ApiResponse(res,"Summarization complete",summary);


  } catch(err){
    console.error(err);
    if (err.message.includes("429") || err.message.includes("quota")) {
    
    return ApiError(res,"The daily free AI credits (20/20) are exhausted. Please come back tomorrow!","Global limit reached",429)
  }
    return ApiError(res,"Could not process images",null,500);
  }
});



app.listen(PORT,()=>{
  console.log(`Server listening on port ${PORT}: ${BACKEND_URL}`)
})