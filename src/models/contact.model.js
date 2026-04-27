import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    reply: { type: String, default: "", trim: true },
    repliedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
