import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/order.js'; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Kết nối MongoDB thành công!'))
  .catch((err) => console.log('❌ Lỗi kết nối DB:', err));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api', orderRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server chạy ở http://localhost:${PORT}`));