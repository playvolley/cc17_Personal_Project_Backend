const prisma = require("../models/prisma");
const cartService = require("../services/cart-service");

cartController = {};

cartController.getCart = async (req, res, next) => {
  const result = await cartService.findCartByUserId(req.user.id);
  res.status(200).send(result);
};

cartController.postCart = async (req, res, next) => {
  await cartService.createCart(req.body);
  res.status(201).json({ message: "cart has created" });
};

cartController.delCart = async (req, res, next) => {
  try {
    console.log("req.params =  ", req.params);
    const numParams = +req.params.id;
    await cartService.delProduct(numParams);
    res.status(204).json({ message: "cartitem has deleted" });
  } catch (err) {
    console.log(err.message);
  }
};

cartController.delAllCart = async (req, res, next) => {
  try {
    console.log("req.params =  ", req.params);
    const { user_id } = +req.params;
    await cartService.delAllProduct(user_id);
    res.status(200).json({ message: "All cartitems had deleted" });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = cartController;
