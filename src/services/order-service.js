const prisma = require("../models/prisma");

const orderService = {};

orderService.getOrder = (userId) =>
  prisma.order.findMany({
    where: { user_id: userId },
    include: { orderItems: true },
  });

orderService.getAllOrder = () =>
  prisma.order.findMany({
    include: { orderItems: true },
  });

orderService.updateStatus = (id, status) =>
  prisma.orderItem.update({
    where: { id: parseInt(id) },
    data: { status },
  });

module.exports = orderService;
