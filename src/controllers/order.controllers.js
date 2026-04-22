// controllers/order.controller.js
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

export const placeOrder = async (req, res) => {
  const { userId } = req.body;

  const cart = await Cart.findOne({ userId });

  const order = await Order.create({
    userId,
    products: cart.products,
    totalAmount: 1000, // calculate later
  });

  await Cart.deleteOne({ userId });

  res.json(order);
};