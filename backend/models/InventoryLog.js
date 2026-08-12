import mongoose from "mongoose";

const inventoryLogSchema = new mongoose.Schema(
  {
    logId: { type: String, required: true },
    date: { type: String, required: true },
    type: { type: String, enum: ['IMPORT', 'EXPORT'], required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    note: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model("InventoryLog", inventoryLogSchema);