const prisma = require("../models/prisma");
const paymentService = require("../services/payment-service");
const paymentController = {};

paymentController.getPayment = async (req, res, next) => {
  try {
    const paymentResult = await paymentService.getPayment();
    res.send(paymentResult);
  } catch (err) {
    console.error(err);
  }
};

paymentController.postPayment = async (req, res, next) => {
  const data = req.body;
  console.log("DATAPAYMENT=>", data);

  const payments = data.orderItems.map((orderItemId) => ({
    order_item_id: orderItemId,
    status: "NOTYET",
    date_payment: new Date(),
    total: data.total,
    method: data.method,
  }));

  console.log("payments", payments);
  try {
    const paymentExists = await paymentService.checkPaymentExists(
      data.orderItems.map((orderItemId) => orderItemId)
    );

    if (paymentExists) {
      res
        .status(400)
        .json({ message: "Payment already created for these items." });

      return;
    }

    await paymentService.postPayment(payments);
    res.status(201).json({ message: "Created Payment Success" });
  } catch (err) {
    console.log(err.message);
  }
};

paymentController.updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log("Update ID=", id, "Status=", status);
  try {
    const result = await paymentService.updateStatus(id, status);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

paymentController.updateMethod = async (req, res, next) => {
  const { id } = req.params;
  const { method } = req.body;
  console.log("Update ID=", id, "method=", method);
  try {
    const result = await paymentService.updateMethod(id, method);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = paymentController;
