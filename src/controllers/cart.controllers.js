// controllers/cart.controller.js
import Cart from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      products: [{ productId, quantity }],
    });
  } else {
    cart.products.push({ productId, quantity });
    await cart.save();
  }

  res.json(cart);
};

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.productId");
  res.json(cart);
};