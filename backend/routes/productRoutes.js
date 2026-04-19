const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const { addProduct, getProducts } = require("../controllers/productController");

router.post("/", upload.single("image"), addProduct);
router.get("/", getProducts);

module.exports = router;
