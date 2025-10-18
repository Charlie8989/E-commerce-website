import express from "express";
import { sendDiscountEmail } from "../controllers/emailController.js";

const emailRouter = express.Router();

emailRouter.post("/discount", sendDiscountEmail);

export default emailRouter;
