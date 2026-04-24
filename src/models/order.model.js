import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    products: [
      {
        productId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Product" 
        },
        quantity: { type: Number, default: 1 },
      },
    ],

    totalAmount: { type: Number, required: true },

    // 🔥 ORDER STATUS (full lifecycle)
    orderStatus: {
      type: String,
      enum: [
        "pending",        // order placed
        "confirmed",      // accepted
        "processing",     // preparing
        "shipped",        // dispatched
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned"
      ],
      default: "pending",
    },

    // 💳 PAYMENT STATUS
    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "refunded"
      ],
      default: "pending",
    },

    // 💰 PAYMENT METHOD
    paymentMethod: {
      type: String,
      enum: [
        "cod",           // Cash on Delivery
        "upi",
        "card",
        "netbanking",
        "wallet"
      ],
      default: "cod",
    },
    trackingId: { type: String },
    deliveredAt: { type: Date },

  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);