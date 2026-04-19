const StockBatch = require("../models/StockBatch");

exports.addStockBatch = async (req, res) => {
  try {
    const {
      productId,
      batchNumber,
      quantityAdded,
      costPrice,
      supplier,
      mfgDate,
      expiryDate,
    } = req.body;

    const stock = await StockBatch.create({
      productId,
      batchNumber,
      quantityAdded,
      quantityRemaining: quantityAdded,
      costPrice,
      supplier,
      mfgDate,
      expiryDate,
    });

    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getStockBatches = async (req, res) => {
  try {
    const stock = await StockBatch.find().populate("productId");

    res.json(stock);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProductBatches = async (req, res) => {
  try {
    const { productId } = req.params;

    const batches = await StockBatch.find({
      productId,
    })
      .populate("productId")
      .sort({ expiryDate: 1 });

    res.json(batches);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
