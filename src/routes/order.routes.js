// routes/order.routes.js
import express from "express";
import { placeOrder , getOrders} from "../controllers/order.controllers.js";

const router = express.Router();
router.post("/", placeOrder);
router.get("/:userId", getOrders);
export default router;