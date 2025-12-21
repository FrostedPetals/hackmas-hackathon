import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Use the Standard API Key (the long one, not the SMTP password)
const API_KEY = `${process.env.BREVO_API_KEY}`; 

async function sendEmail() {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "My App", email: process.env.EMAIL_FROM },
        to: [{ email: "haldaravidha94@gmail.com" }],
        subject: "Brevo API Test",
        textContent: "If you got this, the API works even if SMTP is locked!",
      },
      {
        headers: {
          "api-key": API_KEY,
          "content-type": "application/json",
        },
      }
    );
    console.log("Email sent via API! ID:", response.data.messageId);
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
  }
}

sendEmail();