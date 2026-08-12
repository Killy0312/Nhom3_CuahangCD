import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// API Đăng ký
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const cleanEmail = email.trim();

    // Tìm email không phân biệt chữ hoa/thường
    const existingUser = await User.findOne({ 
      email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') } 
    });
    
    if (existingUser) {
      return res.status(400).json({ error: "Email này đã được sử dụng" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 
    
    const newUser = new User({ 
      name, 
      email: cleanEmail.toLowerCase(), // Lưu dạng chữ thường vào DB
      password: hashedPassword 
    });
    
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
    const cleanEmail = email.trim();

    // Tìm email trong CSDL không phân biệt chữ hoa hay chữ thường
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') } 
    });
    
    if (!user) return res.status(400).json({ error: "Email không tồn tại" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Sai mật khẩu" });

    const token = jwt.sign(
      { id: user._id, role: user.role || 'customer' }, 
      process.env.JWT_SECRET || 'mastercd_secret', 
      { expiresIn: '1d' }
    );

    res.json({ 
      message: "Đăng nhập thành công", 
      token, 
      user: { 
        id: user._id,
        name: user.name, 
        email: user.email,
        role: user.role || 'customer'
      } 
    });
  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi đăng nhập" });
  }
});

export default router;