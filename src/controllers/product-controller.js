const prisma = require("../models/prisma");
const productService = require("../services/product-service");
const productController = {};

productController.getProduct = async (req, res) => {
  try {
    const product = await productService.getAllProduct();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

productController.postProduct = async (req, res) => {
  const { name, price, image } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        image,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

productController.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        price,
        image,
      },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = productController;
