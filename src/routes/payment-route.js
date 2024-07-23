const express = require("express");
const paymentController = require("../controllers/payment-controller");
const paymentService = require("../services/payment-service");

const paymentRouter = express.Router();

paymentRouter.get("/", paymentController.getPayment);
paymentRouter.post("/", paymentController.postPayment);

paymentRouter.patch("/admin/:id", paymentController.updateStatus);

paymentRouter.patch("/admin/method/:id", paymentController.updateMethod);

module.exports = paymentRouter;
