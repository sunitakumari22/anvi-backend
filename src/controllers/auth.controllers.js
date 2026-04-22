// controllers/auth.controller.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    // basic validation
    if (!Array.isArray(address) || address.length === 0) {
      return res.status(400).json({ message: "Address is required" });
    }

    // check required fields in each address
    for (const addr of address) {
      if (!addr.houseNo || !addr.area || !addr.pincode || !addr.city || !addr.state) {
        return res.status(400).json({
          message: "Invalid address format",
        });
      }
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 LOGIN API
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. user check
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. token generate
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};