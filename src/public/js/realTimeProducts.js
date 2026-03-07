const socket = io();

const addProductForm = document.getElementById("addProductForm");
const deleteProductForm = document.getElementById("deleteProductForm");
const productsList = document.getElementById("productsList");
const errorMessage = document.getElementById("errorMessage");

addProductForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(addProductForm);

  const newProduct = {
    title: formData.get("title"),
    description: formData.get("description"),
    code: formData.get("code"),
    price: Number(formData.get("price")),
    status: formData.get("status") === "true",
    stock: Number(formData.get("stock")),
    category: formData.get("category"),
    thumbnails: formData.get("thumbnails")
      ? formData.get("thumbnails").split(",").map((item) => item.trim()).filter(Boolean)
      : []
  };

  socket.emit("addProduct", newProduct);
  addProductForm.reset();
});

deleteProductForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(deleteProductForm);
  const productId = formData.get("productId");

  socket.emit("deleteProduct", productId);
  deleteProductForm.reset();
});

socket.on("updateProducts", (products) => {
  productsList.innerHTML = "";

  if (products.length === 0) {
    productsList.innerHTML = "<li>No hay productos cargados.</li>";
    return;
  }

  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `ID: ${product.id} | ${product.title} | $${product.price} | Stock: ${product.stock}`;
    productsList.appendChild(li);
  });

  errorMessage.textContent = "";
});

socket.on("productError", (message) => {
  errorMessage.textContent = message;
});