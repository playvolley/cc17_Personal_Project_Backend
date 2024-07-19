const express = require("express");
const cartController = require("../controllers/cart-controller");

const cartRouter = express.Router();

cartRouter.get("/", cartController.getCart);
cartRouter.post("/", cartController.postCart);
cartRouter.delete("/:id", cartController.delCart);
cartRouter.delete("/delAll/:user_id", cartController.delAllCart);

module.exports = cartRouter;
