# Proyecto final para la Academia Desafio Latam 

## Descripción del proyecto


## Colaboradores Generación G71

- [Luis Subiabre](https://github.com/LuisSubiabre)
- [Luis Gutierrez](https://github.com/LuisGG34)
- [Oriana Gómez](https://github.com/geoquimica-gomez)

## Requisitos antes de la instalación

- Node versión recomendada ![nodes](https://img.shields.io/badge/node-v18.16.0-gray?style=flat&logo=node.js&logoColor=white&color=339933)

## Procedimiento para iniciar el proyecto
- Clonar el proyecto
- Ir hacia el directorio del proyecto

Instalar dependencias:

## Instalar dependencias para el backend

```bash
  cd server
  npm install
```

# NOTA IMPORTANTE se compartió el archivo .env para que pueda conectarse a la base de datos sin tener que crear una local
- Esto solo estará disponible mientras no se haga el deploy de la base de datos.

Levantar proyecto

```bash
  npm run dev
```

abrir otro terminal para levantar el cliente

## Instalar dependencias para el frontend

```bash
  cd client
  npm install
```

Levantar proyecto

```bash
  npm run dev
```
## Para realizar los test debe capturar un token porbando la ruta POST /login y pegar el token en los archivos test.js
