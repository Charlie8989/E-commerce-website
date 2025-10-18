import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "trendora.charlie@gmail.com",
    pass: "nkzr emlq cwjx fipa",
  },
});