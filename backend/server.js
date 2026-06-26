import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js"; // Nhớ phải có đuôi .js ở đây nhé

const app = express();
const PORT = 5000;

// Cấu hình Middleware
app.use(cors());
app.use(express.json());

// Kết nối cơ sở dữ liêu
mongoose
  .connect("mongodb://localhost:27017/mastercd")
  .then(() => console.log("👉 Kết nối thành công tới MongoDB: mastercd"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Định tuyến API
app.use("/api", productRoutes);

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`🚀 Backend Server đang chạy tại: http://localhost:${PORT}`);
});
