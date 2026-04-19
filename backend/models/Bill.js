const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    billNumber: {
      type: String,
      unique: true,
    },

    customerName: {
      type: String,
      default: "Walk-in Customer",
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card"],
      default: "Cash",
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        name: String,
        sku: String,

        quantity: Number,

        sellingPrice: Number,

        total: Number,
      },
    ],

    subtotal: Number,
    tax: Number,
    grandTotal: Number,

    createdBy: String,
  },
  { timestamps: true }
);

module.exports = mongoose.models.Bill || mongoose.model("Bill", billSchema);
