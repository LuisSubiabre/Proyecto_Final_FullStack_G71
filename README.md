# 📚 Proyecto final para la Academia Desafío Latam

## 📖 Librería y Papelería Alas de Alondra

![Logo de la librería](https://res.cloudinary.com/dxxrdckad/image/upload/v1727986341/LOGO_CLARO-removebg-preview_wcpkli.png)

Proyecto práctico de desarrollo de un marketplace tipo e-commerce llamado **"Librería Alas de Alondra"**, diseñado para la compra y venta de productos escolares, materiales de oficina y otros artículos de papelería. La aplicación web está desarrollada en **React**, con una arquitectura componetizada para facilitar la reutilización de elementos como el **navbar** y el **footer** en múltiples vistas. El backend se implementa con **Node.js** y **PostgreSQL**, mientras que la documentación y pruebas de la API se gestionan con herramientas como **Apiary**.

---

## 👥 **Colaboradores Generación G71**

- [Luis Subiabre](https://github.com/LuisSubiabre)
- [Luis Gutierrez](https://github.com/LuisGG34)
- [Oriana Gómez](https://github.com/geoquimica-gomez)

---

## 🔧 **Requisitos antes de la instalación**

- **Node.js:** ![Node.js version](https://img.shields.io/badge/node-v18.16.0-gray?style=flat&logo=node.js&logoColor=white&color=339933)

---

## 🛠️ **Procedimiento para iniciar el proyecto**

1. Clonar el proyecto
2. Navegar hacia el directorio del proyecto

### **Instalar dependencias para el backend**

````bash
cd server
npm install


# NOTA IMPORTANTE se compartió el archivo .env para que pueda conectarse a la base de datos sin tener que crear una local

- Esto solo estará disponible mientras no se haga el deploy de la base de datos.

Levantar El servidor

```bash
  npm run dev
```

- Abrir otro terminal para levantar el cliente

## Instalar dependencias para el frontend

```bash
  cd client
  npm install
```

Levantar  el client

```bash
  npm run dev
```

## ✅ **Pruebas y testeo**

Para realizar las pruebas es necesario capturar un token probando la ruta `POST /login` y pegarlo en los archivos `test.js`.

### **Procedimiento:**

1. Capturar el token (para esto es necesario que el servidor esté activo).
2. Cerrar el servidor.
3. En el archivo `.env`, descomentar la línea: `NODE_ENV=test`.
4. Correr los tests con el siguiente comando:

```bash
npm test

```
## 🌟 Capturas del proyecto

### **Vista general de la aplicación**
![Captura de pantalla de la aplicación](https://res.cloudinary.com/dxxrdckad/image/upload/v1738431620/Captura_de_pantalla_2025-02-01_143911_iz1uzw.png)

---

### **Resultados de los tests**

#### **Captura de pantalla 1:**
![Resultados de test - Captura 1](https://res.cloudinary.com/dxxrdckad/image/upload/v1738431620/Captura_de_pantalla_2025-02-01_143911_iz1uzw.png)

---

#### **Captura de pantalla 2:**
![Resultados de test - Captura 2](https://res.cloudinary.com/dxxrdckad/image/upload/v1738431416/Captura_de_pantalla_2025-02-01_141637_y8y3yj.png)







````
