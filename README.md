# Programación Backend I – Entrega Final

## Información de la Cursada:

**Alumna:** Rosato, Macarena Ayelén

**Curso:** Programación Backend I: Desarrollo Avanzado de Backend

**Comisión:** 77580

---

# Descripción del Proyecto

Este proyecto corresponde a la **Entrega Final del curso Programación Backend I** de Coderhouse.

---

📌 Descripción

Este proyecto consiste en el desarrollo de un backend de eCommerce utilizando Node.js, Express y MongoDB Atlas como sistema de persistencia principal.

La aplicación permite gestionar productos y carritos, implementando relaciones entre colecciones mediante ObjectId y resolviendo dichas relaciones con el método populate de Mongoose.

Además, se incorporan vistas dinámicas con Handlebars que permiten al usuario navegar por los productos, visualizar detalles y gestionar un carrito de compras de forma intuitiva.

---

⚙️ Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Mongoose Paginate
- Handlebars

---

🚀 Instalación y ejecución

1. Clonar el repositorio:

    - git clone https://github.com/marosato/Coderhouse_PB1-Rosato_Macarena-Proyecto.git

2. Acceder al proyecto:

    - cd Coderhouse_PB1-Rosato_Macarena-Proyecto

3. Instalar dependencias:

    - npm install

4. Ejecutar el servidor:

    - npm start

5. Abrir en el navegador:

    - http://localhost:8080/products

---

🧠 Funcionalidades principales

📦 Productos

- Crear productos
- Obtener productos con:
  - paginación
  - filtros por categoría o disponibilidad
  - ordenamiento por precio (asc/desc)
- Actualizar productos
- Eliminar productos

---

🛒 Carritos

- Crear carrito
- Agregar productos al carrito
- Eliminar productos del carrito
- Actualizar cantidad de un producto
- Reemplazar productos del carrito
- Vaciar carrito completo
- Visualizar carrito con populate

---

🌐 Vistas (Handlebars)

- "/products" → listado paginado de productos
- "/products/:pid" → detalle del producto
- "/carts/:cid" → vista del carrito

Incluye:

- navegación entre páginas
- botón de agregar al carrito
- experiencia de usuario mejorada

---

🔗 Endpoints principales

Productos

- "GET /api/products"
- "GET /api/products/:pid"
- "POST /api/products"
- "PUT /api/products/:pid"
- "DELETE /api/products/:pid"

---

Carritos

- "POST /api/carts"
- "GET /api/carts/:cid"
- "POST /api/carts/:cid/product/:pid"
- "DELETE /api/carts/:cid/products/:pid"
- "PUT /api/carts/:cid"
- "PUT /api/carts/:cid/products/:pid"
- "DELETE /api/carts/:cid"

---

📊 Formato de respuesta (paginación)

{
  "status": "success",
  "payload": [],
  "totalPages": 1,
  "prevPage": null,
  "nextPage": null,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevLink": null,
  "nextLink": null
}

---

🔍 Ejemplos de uso

Obtener productos

GET http://localhost:8080/api/products

---

Filtrar por categoría

GET http://localhost:8080/api/products?query=tecnologia

---

Ordenar por precio

GET http://localhost:8080/api/products?sort=asc

---

👩‍💻 Autora

Rosato, Macarena Ayelén.