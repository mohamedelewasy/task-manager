const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router.route("/filter").get(productController.filterProducts);

module.exports = router;
