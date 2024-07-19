const orderService = require("../services/order-service");
const prisma = require("../models/prisma");
const orderController = {};

orderController.getOrder = async (req, res, next) => {
  try {
    const id = req.body.id;
    //console.log("order id = ", req.body.id);
    const result = await orderService.getOrder(id);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

orderController.postOrder = async (req, res, next) => {
  const { userId, tableId, data } = req.body;
  console.log("BODY = ", req.body);
  try {
    const createdOrder = await prisma.order.create({
      data: {
        // ข้อมูลสำหรับตารางหลัก (order)
        user_id: userId,
        table_id: tableId,
      },
    });
    console.log("createdOrder = ", createdOrder);
    const orderId = createdOrder.id;
    console.log("orderId YES = ", orderId);
    console.log("dataFromReq = ", data);
    const createdOrderItems = await prisma.orderItem.createMany({
      data: data.map((item) => ({
        order_id: orderId,
        product_id: item.product_id,
        amount: item.amount,
        price: item.price,
        discount: 0,
        status: "PENDING",
      })),
    });
    console.log("createdOrderItems", createdOrderItems);
    res.status(201).json("Order has created");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

orderController.delAllOrder = async (req, res, next) => {};

module.exports = orderController;
