import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.post('/checkout', async (req, res) => {
  const { cart } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: "Giỏ hàng rỗng, không thể thanh toán!" });
  }

  try {
    for (const item of cart) {
      const productId = item._id || item.id;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: `Không tìm thấy sản phẩm: ${item.name}` });
      }

      // Kiểm tra trường stock trong MongoDB
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Sản phẩm "${item.name}" không đủ hàng! Trong kho hiện chỉ còn ${product.stock} đĩa.` 
        });
      }
    }

    const updatePromises = cart.map(item => {
      const productId = item._id || item.id;
      return Product.findByIdAndUpdate(
        productId,
        { $inc: { stock: -item.quantity } }, // Trừ số lượng đi
        { new: true }
      );
    });

    await Promise.all(updatePromises);

    res.status(200).json({ 
      success: true, 
      message: "Đặt hàng thành công!", 
      orderId: "MCD" + Math.floor(100000 + Math.random() * 900000) 
    });

  } catch (error) {
    console.error("Lỗi xử lý đơn hàng:", error);
    res.status(500).json({ error: "Lỗi hệ thống khi xử lý trừ kho dữ liệu." });
  }
});

export default router;