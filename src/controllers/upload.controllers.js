import cloudinary from "../config/cloudinary.config.js";

export const uploadImage = async (req, res) => {
  try {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return res.status(500).json({ message: "Cloudinary environment variables are missing" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    if (!req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({ message: "Only image files are allowed" });
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: process.env.CLOUDINARY_FOLDER || "anvi-uploads",
      resource_type: "image",
    });

    res.status(201).json({
      message: "Image uploaded successfully",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to upload image",
      error: error.message,
    });
  }
};
