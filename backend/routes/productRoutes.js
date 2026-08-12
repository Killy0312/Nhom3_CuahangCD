import express from 'express';
import Product from '../models/Product.js'; 

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy danh sách sản phẩm" });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Lỗi thêm sản phẩm mới" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Lỗi cập nhật sản phẩm" });
  }
});

// DELETE: Xóa sản phẩm
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa sản phẩm khỏi CSDL" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi xóa sản phẩm" });
  }
});

export default router;