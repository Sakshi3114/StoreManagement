const Product = require("../models/Product");
const StockBatch = require("../models/StockBatch");

exports.getInventory = async (req, res) => {
  try {
    const products = await Product.find();

    const today = new Date();
    const next30 = new Date();
    next30.setDate(today.getDate() + 30);

    const inventory = await Promise.all(
      products.map(async (product) => {
        const batches = await StockBatch.find({
          productId: product._id,
        });

        const totalStock = batches.reduce(
          (sum, item) => sum + item.quantityRemaining,
          0
        );

        const nearExpiry = batches.reduce((sum, item) => {
          if (
            item.expiryDate &&
            item.expiryDate <= next30 &&
            item.quantityRemaining > 0
          ) {
            return sum + item.quantityRemaining;
          }
          return sum;
        }, 0);

        return {
          _id: product._id,
          name: product.name,
          sku: product.sku,
          category: product.category,
          sellingPrice: product.sellingPrice,
          totalStock,
          nearExpiry,
          image: product.image,
        };
      })
    );

    res.json(inventory);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
