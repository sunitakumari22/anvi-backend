// routes/product.routes.js
import express from "express";
import { createProduct, getProducts } from "../controllers/product.controllers.js";

const router = express.Router();
router.post("/", createProduct);
router.get("/", getProducts);
export default router;