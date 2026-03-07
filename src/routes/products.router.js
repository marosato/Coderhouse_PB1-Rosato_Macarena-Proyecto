const express = require("express");
const ProductManager = require("../managers/ProductManager");

const router = express.Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const productId = Number(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    } = req.body;

    if (!title || !description || !code || !category) {
      return res.status(400).json({
        error: "Faltan campos de texto obligatorios"
      });
    }

    if (typeof price !== "number" || typeof stock !== "number") {
      return res.status(400).json({
        error: "price y stock deben ser números"
      });
    }

    if (typeof status !== "boolean") {
      return res.status(400).json({
        error: "status debe ser true o false"
      });
    }

    if (!Array.isArray(thumbnails)) {
      return res.status(400).json({
        error: "thumbnails debe ser un array"
      });
    }

    const newProduct = await productManager.addProduct({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto" });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const productId = Number(req.params.pid);
    const updatedProduct = await productManager.updateProduct(productId, req.body);

    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const productId = Number(req.params.pid);
    const deleted = await productManager.deleteProduct(productId);

    if (!deleted) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

module.exports = router;