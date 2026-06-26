import express from "express";
import Product from "../models/Product.js"; // Phải có .js ở cuối

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi", error });
  }
});

export default router; // Đảm bảo chỉ dùng export này
