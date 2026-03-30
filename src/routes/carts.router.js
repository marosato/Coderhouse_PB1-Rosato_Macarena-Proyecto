const express = require("express");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newCart = await Cart.create({ products: [] });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate("products.product");

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const product = await Product.findById(req.params.pid);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const existingProduct = cart.products.find(
      (p) => p.product.toString() === req.params.pid
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({
        product: req.params.pid,
        quantity: 1
      });
    }

    await cart.save();

    // UX FIX
    const referer = req.headers.referer;
    res.redirect(referer || "/products");

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== req.params.pid
    );

    await cart.save();

    res.json({ message: "Producto eliminado del carrito", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const { products } = req.body;

    const cart = await Cart.findByIdAndUpdate(
      req.params.cid,
      { products },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findById(req.params.cid);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const product = cart.products.find(
      (p) => p.product.toString() === req.params.pid
    );

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado en carrito" });
    }

    product.quantity = quantity;

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.cid,
      { products: [] },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json({ message: "Carrito vaciado", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;