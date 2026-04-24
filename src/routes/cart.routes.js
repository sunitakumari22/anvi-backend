// routes/cart.routes.js
import express from "express";
import { addToCart, getCart,clearCart ,removeFromCart,updateCartItem} from "../controllers/cart.controllers.js";

const router = express.Router();
router.post("/add", addToCart);
router.get("/:userId", getCart);
router.delete("/:userId/clear", clearCart);
router.delete("/:userId/items/:productId", removeFromCart);
router.put("/:userId/items/:productId", updateCartItem);
export default router;