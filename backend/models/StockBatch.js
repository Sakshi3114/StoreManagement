const mongoose = require("mongoose");

const stockBatchSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    batchNumber: {
      type: String,
      required: true,
    },

    quantityAdded: {
      type: Number,
      required: true,
    },

    quantityRemaining: {
      type: Number,
      required: true,
    },

    costPrice: {
      type: Number,
      required: true,
    },

    supplier: String,

    mfgDate: Date,

    expiryDate: Date,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.StockBatch || mongoose.model("StockBatch", stockBatchSchema);
