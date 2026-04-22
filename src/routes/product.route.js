// routes/product.routes.js
import express from "express";
import {
	createProduct,
	getProducts,
	getProductById,
	updateProductById,
	deleteProductById,
} from "../controllers/product.controllers.js";

const router = express.Router();
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);
export default router;