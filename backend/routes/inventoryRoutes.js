import express from 'express';
import InventoryLog from '../models/InventoryLog.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const logs = await InventoryLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy nhật ký kho" });
  }
});

router.post('/', async (req, res) => {
  try {
    const newLog = new InventoryLog(req.body);
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lưu nhật ký kho" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await InventoryLog.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa log thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi xóa log" });
  }
});

router.delete('/', async (req, res) => {
  try {
    await InventoryLog.deleteMany({});
    res.json({ message: "Đã xóa sạch log kho" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi xóa toàn bộ log" });
  }
});

export default router;