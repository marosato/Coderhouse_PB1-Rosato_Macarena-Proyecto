const fs = require("fs").promises;
const path = require("path");

class ProductManager {
  constructor() {
    this.path = path.join(__dirname, "../data/products.json");
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");

      if (!data.trim()) {
        return [];
      }

      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async saveProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((product) => product.id === id) || null;
  }

  async addProduct(productData) {
    const products = await this.getProducts();

    const newId =
      products.length > 0
        ? Math.max(...products.map((product) => product.id)) + 1
        : 1;

    const newProduct = {
      id: newId,
      title: productData.title,
      description: productData.description,
      code: productData.code,
      price: productData.price,
      status: productData.status,
      stock: productData.stock,
      category: productData.category,
      thumbnails: productData.thumbnails
    };

    products.push(newProduct);
    await this.saveProducts(products);

    return newProduct;
  }

  async updateProduct(id, updatedData) {
    const products = await this.getProducts();
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      return null;
    }

    const currentProduct = products[index];

    const updatedProduct = {
      ...currentProduct,
      ...updatedData,
      id: currentProduct.id
    };

    products[index] = updatedProduct;
    await this.saveProducts(products);

    return updatedProduct;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const exists = products.some((product) => product.id === id);

    if (!exists) {
      return false;
    }

    const filteredProducts = products.filter((product) => product.id !== id);
    await this.saveProducts(filteredProducts);

    return true;
  }
}

module.exports = ProductManager;