import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true }, 
  
  genre: { type: String, required: true, default: "Rock" }, 
  
  stock: { type: Number, required: true, default: 0 }, 
  
  img: { type: String, required: true },
  tracklist: { type: Array, default: [] },
  specs: { type: Array, default: [] },
}, { 
  timestamps: true 
});

const Product = mongoose.model("Product", productSchema);

export default Product;