const express = require("express");
const authenticate = require("../middlewares/authenticate");
const orderController = require("../controllers/order-controller");

const orderRouter = express.Router();

orderRouter.get("/", orderController.getOrder);
orderRouter.get("/itemorder", orderController.getAllItemOrder);
orderRouter.post("/", orderController.postOrder);
orderRouter.delete("/", orderController.delAllOrder);
orderRouter.patch("/admin/:id", orderController.updateStatus);

module.exports = orderRouter;
