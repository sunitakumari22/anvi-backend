import "dotenv/config";
import nodemailer from "nodemailer";

// ✅ transporter with proper config
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ verify connection once (helps debugging)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email config error:", error);
  } else {
    console.log("✅ Email server is ready");
  }
});

// ✅ reusable mail function
export const sendMail = async (to, subject, text) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials missing in .env");
    }

    const info = await transporter.sendMail({
      from: `"Anvi Store 🛒" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("📩 Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
};