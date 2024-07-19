const express = require("express");
const productController = require("../controllers/product-controller");

const productRouter = express.Router();

productRouter.get("/", productController.getProduct);
productRouter.post("/", productController.postProduct);
productRouter.put("/:id", productController.updateProduct);

module.exports = productRouter;
