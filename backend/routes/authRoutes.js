import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// API Đăng ký
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Băm mật khẩu để bảo mật
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 
    
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi đăng ký" });
  }
});

// API Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Email không tồn tại" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Sai mật khẩu" });

    // JWT_SECRET lấy từ file .env (ví dụ: chuoi_ky_tu_bi_mat_cua_nhom_minh)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'mastercd_secret', { expiresIn: '1d' });
    res.json({ message: "Đăng nhập thành công", token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi đăng nhập" });
  }
});

export default router;