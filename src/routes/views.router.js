const express = require("express");
const ProductManager = require("../managers/ProductManager");

const router = express.Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    res.status(500).send("Error al cargar la vista home");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).send("Error al cargar la vista realtime");
  }
});

module.exports = router;