import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/order.js'; 
import inventoryRoutes from './routes/inventoryRoutes.js'; 
import User from './models/User.js';

dotenv.config();
const app = express();

// Nâng dung lượng nhận dữ liệu JSON cho ảnh lớn (tránh bị lỗi đứt gánh)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

const seedAdminAccount = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@mastercd.com' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'Quản Trị Viên MasterCD',
        email: 'admin@mastercd.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Đã khởi tạo tài khoản Admin mặc định trong MongoDB!');
    }
  } catch (err) {
    console.log('Lỗi khi khởi tạo tài khoản Admin:', err);
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Kết nối MongoDB thành công!');
    seedAdminAccount();
  })
  .catch((err) => console.log('Lỗi kết nối DB:', err));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/inventory-logs', inventoryRoutes); // 👈 BỔ SUNG
app.use('/api', orderRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy ở http://localhost:${PORT}`));