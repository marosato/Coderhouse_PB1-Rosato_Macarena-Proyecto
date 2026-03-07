# Programación Backend I – Entrega N°2

## Información de la Cursada:

**Alumna:** Rosato, Macarena Ayelén
**Curso:** Programación Backend I: Desarrollo Avanzado de Backend
**Comisión:** 77580

---

# Descripción del Proyecto

Este proyecto corresponde a la **Entrega N°2 del curso Programación Backend I** de Coderhouse.

El objetivo del proyecto es desarrollar un **servidor backend con Node.js y Express** que permita:

* gestionar productos mediante una **API REST**
* gestionar carritos de compra
* persistir información en archivos **JSON**
* renderizar vistas utilizando **Handlebars**
* actualizar productos **en tiempo real mediante WebSockets (Socket.io)**

El sistema permite:

✔ administrar productos
✔ administrar carritos
✔ visualizar productos en una página web
✔ agregar o eliminar productos en tiempo real

---

# Tecnologías Utilizadas

El proyecto fue desarrollado utilizando:

* Node.js
* Express
* Express Handlebars
* Socket.io
* JavaScript
* WebSockets
* Persistencia en archivos JSON

Dependencias principales del proyecto:

```
express
express-handlebars
socket.io
```

---

# Estructura del Proyecto

```
src
│
├── app.js
│
├── data
│   ├── products.json
│   └── carts.json
│
├── managers
│   ├── ProductManager.js
│   └── CartManager.js
│
├── routes
│   ├── products.router.js
│   ├── carts.router.js
│   └── views.router.js
│
├── views
│   ├── home.handlebars
│   ├── realTimeProducts.handlebars
│   └── layouts
│        └── main.handlebars
│
└── public
    └── js
        └── realTimeProducts.js
```

---

# Explicación General del Sistema

El sistema funciona en tres capas principales.

## 1️⃣ API REST

Permite administrar productos y carritos mediante endpoints HTTP.

Ejemplos:

```
GET /api/products
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

---

## 2️⃣ Renderizado de Vistas

Se utilizan plantillas **Handlebars** para mostrar los productos en páginas web.

Las vistas principales son:

```
/
```

Lista de productos.

```
/realtimeproducts
```

Gestión de productos en tiempo real.

---

## 3️⃣ Comunicación en Tiempo Real

Se utiliza **Socket.io** para actualizar la lista de productos automáticamente cuando se agregan o eliminan productos.

Esto evita tener que recargar la página.

---

# Persistencia de Datos

Los datos se almacenan en archivos JSON.

```
src/data/products.json
src/data/carts.json
```

Esto permite que la información permanezca guardada incluso después de reiniciar el servidor.

---

# Instalación del Proyecto

## 1️⃣ Clonar el repositorio

Abrir una terminal y ejecutar:

```
git clone https://github.com/marosato/Coderhouse_PB1-Rosato_Macarena-Proyecto.git
```

---

## 2️⃣ Ingresar a la carpeta del proyecto

```
cd Coderhouse_PB1-Rosato_Macarena-Proyecto
```

---

## 3️⃣ Instalar dependencias

```
npm install
```

Esto instalará todas las dependencias necesarias para ejecutar el proyecto.

---

## 4️⃣ Ejecutar el servidor

```
npm start
```

Si todo funciona correctamente, la terminal mostrará algo como:

```
Servidor corriendo en http://localhost:8080
```

---

# Cómo utilizar el sistema

Una vez iniciado el servidor, abrir el navegador web.

---

# Página principal

Abrir:

```
http://localhost:8080/
```

Esta página muestra la **lista de productos disponibles**.

Ejemplo de lo que se verá:

```
ID: 1 | Notebook | $900 | Stock: 10
ID: 2 | Mouse | $50 | Stock: 100
ID: 3 | Teclado | $150 | Stock: 50
```

Esta página se actualiza **solo al recargar el navegador**.

---

# Página de productos en tiempo real

Abrir:

```
http://localhost:8080/realtimeproducts
```

Esta página permite **gestionar productos en tiempo real**.

El sistema incluye dos formularios.

---

# Agregar producto

El usuario debe completar el formulario con los siguientes datos:

| Campo       | Ejemplo                     |
| ----------- | --------------------------- |
| title       | Monitor                     |
| description | Monitor Samsung 24 pulgadas |
| code        | MN001                       |
| price       | 300                         |
| status      | true                        |
| stock       | 20                          |
| category    | tecnologia                  |
| thumbnails  | monitor.jpg                 |

Ejemplo completo:

```
title: Monitor
description: Monitor Samsung
code: MN001
price: 300
status: true
stock: 20
category: tecnologia
thumbnails: monitor.jpg
```

Luego presionar **Agregar producto**.

El producto aparecerá automáticamente en la lista **sin recargar la página**.

---

# Eliminar producto

Para eliminar un producto:

1️⃣ escribir el **ID del producto**

Ejemplo:

```
2
```

2️⃣ presionar **Eliminar producto**

El producto desaparecerá automáticamente de la lista.

---

# Ejemplo de flujo de uso

1️⃣ abrir:

```
http://localhost:8080/realtimeproducts
```

2️⃣ agregar un producto:

```
title: Monitor
description: Monitor Samsung
code: MN001
price: 300
status: true
stock: 20
category: tecnologia
thumbnails: monitor.jpg
```

3️⃣ el producto aparecerá inmediatamente en la lista

4️⃣ eliminar un producto ingresando su ID

```
ID del producto: 2
```

5️⃣ la lista se actualizará automáticamente

---

# API REST

El sistema también permite administrar productos mediante la API.

## Obtener productos

```
GET /api/products
```

---

## Obtener producto por ID

```
GET /api/products/1
```

---

## Crear producto

```
POST /api/products
```

Ejemplo de body JSON:

```
{
"title": "Mouse",
"description": "Mouse Logitech",
"code": "MS001",
"price": 50,
"status": true,
"stock": 100,
"category": "perifericos",
"thumbnails": []
}
```

---

## Actualizar producto

```
PUT /api/products/1
```

---

## Eliminar producto

```
DELETE /api/products/1
```
