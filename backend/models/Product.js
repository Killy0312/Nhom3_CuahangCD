import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    artist: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    genre: { type: String, default: 'Rock' },
    stock: { type: Number, default: 20 },
    img: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);