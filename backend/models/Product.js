const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      unique: true,
      required: true,
    },

    name: String,
    barcode: String,
    category: String,
    brand: String,
    sellingPrice: Number,
    taxPercent: Number,
    image: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
