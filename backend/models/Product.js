import mongoose from "mongoose"; // 1. Phải import mongoose vào đây

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  img: { type: String, required: true },
  tracklist: { type: Array, default: [] },
  specs: { type: Array, default: [] },
});

// 2. Định nghĩa Model
const Product = mongoose.model("Product", productSchema);

// 3. Xuất ra theo chuẩn ES Module
export default Product;
