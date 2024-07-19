const prisma = require("../models/prisma");

const cartService = {};

cartService.createCart = (data) => prisma.cart.create({ data });

cartService.findCartByUserId = (userId) =>
  prisma.cart.findMany({
    where: { user_id: userId },
    include: {
      product: true,
    },
  });

cartService.delProduct = (cartId) => {
  console.log("cartId = ", cartId);
  return prisma.cart.delete({ where: { id: cartId } });
};

cartService.delAllProduct = (id) => {
  console.log("userId = ", id);
  return prisma.cart.deleteMany({ where: { user_id: id } });
};

module.exports = cartService;
