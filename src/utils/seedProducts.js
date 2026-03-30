const Product = require("../models/product.model");

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();

    if (count > 0) {
      console.log("Seed omitido: ya hay productos en la base");
      return;
    }

    const products = [
      {
        title: "Smartphone Samsung Galaxy S21",
        description: "Celular de alta gama con 128GB de almacenamiento",
        code: "CEL001",
        price: 850,
        status: true,
        stock: 15,
        category: "tecnologia",
        thumbnails: []
      },
      {
        title: "Notebook HP Pavilion",
        description: "Notebook con procesador Intel i5 y 8GB RAM",
        code: "NB002",
        price: 1100,
        status: true,
        stock: 8,
        category: "tecnologia",
        thumbnails: []
      },
      {
        title: "Auriculares Bluetooth Sony",
        description: "Auriculares inalámbricos con cancelación de ruido",
        code: "AUD001",
        price: 250,
        status: true,
        stock: 20,
        category: "audio",
        thumbnails: []
      },
      {
        title: "Monitor LG 24 pulgadas",
        description: "Monitor Full HD con panel IPS",
        code: "MON001",
        price: 300,
        status: true,
        stock: 12,
        category: "tecnologia",
        thumbnails: []
      },
      {
        title: "Mouse Logitech Inalámbrico",
        description: "Mouse ergonómico con conexión USB",
        code: "MOU001",
        price: 40,
        status: true,
        stock: 30,
        category: "perifericos",
        thumbnails: []
      },
      {
        title: "Teclado Mecánico Redragon",
        description: "Teclado gamer con retroiluminación RGB",
        code: "TEC001",
        price: 120,
        status: true,
        stock: 18,
        category: "perifericos",
        thumbnails: []
      },
      {
        title: "PlayStation 5",
        description: "Consola de última generación Sony",
        code: "CON001",
        price: 1200,
        status: true,
        stock: 5,
        category: "gaming",
        thumbnails: []
      },
      {
        title: "Smart TV Samsung 50 pulgadas",
        description: "Televisor 4K UHD con apps integradas",
        code: "TV001",
        price: 700,
        status: true,
        stock: 7,
        category: "hogar",
        thumbnails: []
      }
    ];

    await Product.insertMany(products);

    console.log("Seed ejecutado: productos cargados correctamente");
  } catch (error) {
    console.error("Error en seedProducts:", error);
  }
};

module.exports = seedProducts;