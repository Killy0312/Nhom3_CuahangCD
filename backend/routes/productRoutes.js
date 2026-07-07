import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}); // Kéo toàn bộ đĩa CD từ MongoDB
    res.json(products);
  } catch (error) {
    console.error("Lỗi lấy sản phẩm:", error);
    res.status(500).json({ message: "Lỗi Server" });
  }
});

export default router;