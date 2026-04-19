const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : "";

    const product = await Product.create({
      ...req.body,
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getProducts = async (req, res) => {
  const products = await Product.find();

  res.json(products);
};
