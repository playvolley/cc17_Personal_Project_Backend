const express = require("express");
const productController = require("../controllers/product-controller");

const productRouter = express.Router();

productRouter.get("/", productController.getProduct);
productRouter.post("/", productController.postProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.delProduct);

module.exports = productRouter;
