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

module.exports = paymentService;
