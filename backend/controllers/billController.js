const Bill = require("../models/Bill");
const StockBatch = require("../models/StockBatch");

exports.createBill = async (req, res) => {
  try {
    const { customerName, paymentMethod, items, subtotal, tax, grandTotal } =
      req.body;

    for (const item of items) {
      let qtyNeeded = item.quantity;

      const batches = await StockBatch.find({
        productId: item.productId,
        quantityRemaining: { $gt: 0 },
      }).sort({ expiryDate: 1 });

      for (const batch of batches) {
        if (qtyNeeded <= 0) break;

        if (batch.quantityRemaining >= qtyNeeded) {
          batch.quantityRemaining -= qtyNeeded;
          qtyNeeded = 0;
        } else {
          qtyNeeded -= batch.quantityRemaining;
          batch.quantityRemaining = 0;
        }

        await batch.save();
      }

      if (qtyNeeded > 0) {
        return res.status(400).json({
          message: `${item.name} insufficient stock`,
        });
      }
    }

    const bill = await Bill.create({
      billNumber: "BILL-" + Date.now(),
      customerName,
      paymentMethod,
      items,
      subtotal,
      tax,
      grandTotal,
    });

    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });

    res.json(bills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
