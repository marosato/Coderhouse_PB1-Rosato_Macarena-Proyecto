const express = require("express");
const { engine } = require("express-handlebars");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");

const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");
const viewsRouter = require("./routes/views.router");
const ProductManager = require("./managers/ProductManager");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const productManager = new ProductManager();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  const products = await productManager.getProducts();
  socket.emit("updateProducts", products);

  socket.on("addProduct", async (productData) => {
    try {
      await productManager.addProduct(productData);
      const updatedProducts = await productManager.getProducts();
      io.emit("updateProducts", updatedProducts);
    } catch (error) {
      socket.emit("productError", "Error al agregar el producto");
    }
  });

  socket.on("deleteProduct", async (productId) => {
    try {
      const deleted = await productManager.deleteProduct(Number(productId));

      if (!deleted) {
        return socket.emit("productError", "Producto no encontrado");
      }

      const updatedProducts = await productManager.getProducts();
      io.emit("updateProducts", updatedProducts);
    } catch (error) {
      socket.emit("productError", "Error al eliminar el producto");
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});