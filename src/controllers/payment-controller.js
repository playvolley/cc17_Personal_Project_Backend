const prisma = require("../models/prisma");
const paymentService = require("../services/payment-service");
const paymentController = {};

paymentController.getPayment = (req, res, next) => {};

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

    const createPayment = await paymentService.postPayment(payments);
    res.status(201).json({ message: "Created Payment Success" });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = paymentController;
