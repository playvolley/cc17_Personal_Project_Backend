const prisma = require("../models/prisma");

const paymentService = {};

paymentService.getPayment = () => prisma.payment.findMany();

paymentService.postPayment = (payments) =>
  prisma.payment.createMany({ data: payments });

paymentService.checkPaymentExists = async (orderItemIds) => {
  //console.log("orderItemIds", orderItemIds);
  const existingPayments = await prisma.payment.findMany({
    where: {
      order_item_id: {
        in: orderItemIds,
      },
    },
  });
  return existingPayments.length > 0;
};

paymentService.updateStatus = (id, status) =>
  prisma.payment.update({
    where: { id: parseInt(id) },
    data: { status },
  });

paymentService.updateMethod = (id, method) =>
  prisma.payment.update({
    where: { id: parseInt(id) },
    data: { method },
  });

module.exports = paymentService;
