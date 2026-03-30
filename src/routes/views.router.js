const express = require("express");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

const router = express.Router();

async function getOrCreateCart() {
  let cart = await Cart.findOne();

  if (!cart) {
    cart = await Cart.create({ products: [] });
  }

  return cart;
}

router.get("/products", async (req, res) => {
  try {
    let { limit = 10, page = 1, sort, query } = req.query;

    limit = parseInt(limit);
    page = parseInt(page);

    const filter = {};

    if (query) {
      if (query === "true" || query === "false") {
        filter.status = query === "true";
      } else {
        filter.category = query;
      }
    }

    const options = {
      limit,
      page,
      lean: true
    };

    if (sort === "asc") {
      options.sort = { price: 1 };
    }

    if (sort === "desc") {
      options.sort = { price: -1 };
    }

    const result = await Product.paginate(filter, options);
    const cart = await getOrCreateCart();

    res.render("index", {
      products: result.docs,
      page: result.page,
      totalPages: result.totalPages,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      cartId: cart._id.toString(),
      query,
      sort
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/products/:pid", async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean();

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    const cart = await getOrCreateCart();

    res.render("productDetail", {
      product,
      cartId: cart._id.toString()
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid)
      .populate("products.product")
      .lean();

    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    res.render("cart", {
      cart,
      cartId: cart._id.toString()
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;