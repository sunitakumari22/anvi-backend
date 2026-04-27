// routes/order.routes.js
import express from "express";
import {
	placeOrder,
	getOrders,
	getAllOrders,
	updateOrderStatus,
} from "../controllers/order.controllers.js";

const router = express.Router();
router.post("/", placeOrder);
router.get("/", getAllOrders);
router.patch("/:orderId/status", updateOrderStatus);
router.get("/:userId", getOrders);

export default router;