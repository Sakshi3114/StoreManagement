const express = require("express");
const router = express.Router();

const {
  addStockBatch,
  getStockBatches,
  getProductBatches,
} = require("../controllers/stockController");

router.post("/", addStockBatch);
router.get("/", getStockBatches);

router.get("/:productId", getProductBatches);

module.exports = router;
