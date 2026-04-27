import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import { sendMail } from "../utills/sendMail.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    // ✅ Get user details
    const user = await User.findById(userId);

    // ✅ Get cart with product details
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ✅ Calculate total
    const totalAmount = cart.products.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );

    // ✅ Create order
    const order = await Order.create({
      userId,
      products: cart.products,
      totalAmount,
    });

    // ✅ Product details
    let productDetails = "";

    cart.products.forEach((item, index) => {
      productDetails += `
Product ${index + 1}:
Name: ${item.productId.name}
Price: ₹${item.productId.price}
Quantity: ${item.quantity}
Subtotal: ₹${item.productId.price * item.quantity}
-------------------------
`;
    });

    // ✅ Address (first address for now)
    const address = user.address?.[0];

    const addressText = address
      ? `
🏠 Address:
${address.houseNo}, ${address.area}
${address.landmark ? address.landmark + "," : ""}
${address.city} - ${address.pincode}
${address.state}
`
      : "No address available";

    // ✅ Final email
    const emailText = `
🛒 New Order Placed!

👤 User Details:
Name: ${user.name}
Email: ${user.email}
Phone: ${user.phone}

${addressText}

${productDetails}

💰 Total Amount: ₹${order.totalAmount}

📦 Order Status: ${order.orderStatus}
💳 Payment Status: ${order.paymentStatus}
`;

    // ✅ Send mail to user
    await sendMail(user.email, "Order Confirmation", emailText);

    // ✅ Send mail to owner
    await sendMail(process.env.OWNER_EMAIL, "New Order Received", emailText);

    // ✅ Clear cart
    await Cart.deleteOne({ userId });

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing order" });
  }
};
 export const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId }).populate("products.productId");
  res.json(orders);
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email phone")
      .populate("products.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all orders" });
  }
};