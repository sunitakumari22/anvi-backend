// routes/auth.routes.js
import express from "express";
import { register, login, getUserDetails } from "../controllers/auth.controllers.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/:userId", getUserDetails);
export default router;