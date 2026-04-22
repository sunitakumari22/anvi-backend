// routes/order.routes.js
import express from "express";
import { placeOrder } from "../controllers/order.controllers.js";

const router = express.Router();
router.post("/", placeOrder);
export default router;