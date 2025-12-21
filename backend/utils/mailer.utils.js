
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 * Sends a verification email using the Brevo REST API.
 * This replaces the Nodemailer transporter logic.
 */
export async function verifyEmail(to, token) {
  const verificationLink = `${process.env.BACKEND_URL}/api/verify-email?token=${token}`;

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { 
          name: "Chime", 
          email: process.env.EMAIL_FROM 
        },
        to: [{ email: to }],
        subject: "Verify Your Email please!",
        htmlContent: `
          <h2>Welcome!</h2>
          <p>Click the link below to verify your email:</p>
          <a href="${verificationLink}" style="padding: 20px; background-color: #007bff; color: white; margin: 5px; border-radius: 5px;">
            Verify Email
          </a>
        `,
        textContent: `Click the link below to verify your email: ${verificationLink}`
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY, // Use your standard API Key here
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
    );

    console.log("Verification mail sent successfully ✅", response.data.messageId);
    return response.data;
  } catch (err) {
    // Improved error logging to see exactly why it failed
    console.error(
      "Could not send verification link:", 
      err.response?.data || err.message
    );
    throw err; // Re-throw so your calling function knows it failed
  }
}