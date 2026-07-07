import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Nhập 2 cái route vừa sửa ở trên vào
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Kết nối DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Kết nối MongoDB thành công!'))
  .catch((err) => console.log('❌ Lỗi kết nối DB:', err));

// Ghim các đường link API
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server chạy ở http://localhost:${PORT}`));