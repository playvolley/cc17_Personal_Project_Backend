const prisma = require("../models/prisma");

const productService = {};

productService.findProductById = (productId) =>
  prisma.cart.findUnique({ where: { id: productId } });

productService.getAllProduct = () => prisma.product.findMany();

module.exports = productService;
