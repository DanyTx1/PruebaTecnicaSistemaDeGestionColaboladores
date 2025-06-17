#  Sistema de Gestión de Colaboradores

Proyecto Full Stack desarrollado como parte de una **prueba técnica**, compuesto por un frontend en Angular y un backend en Node.js con Express. Permite gestionar colaboradores mediante operaciones CRUD, autenticación y una interfaz moderna con DataTables y Bootstrap.

---

## 📁 Estructura del Proyecto

## 🚀 Funcionalidades

###  Frontend
-  Lista de colaboradores con paginación y búsqueda.
-  Agregar nuevos colaboradores.
-  Editar colaborador desde modal.
-  Eliminar colaborador con confirmación.
-  Nivel de riesgo según edad (18–25, 26–50, 51+).
-  Estilizado con Bootstrap 5 y alertas con SweetAlert2.

###  Backend
-  Autenticación con JWT.
-  API RESTful protegida.
-  Endpoint paginado para DataTables.
-  Validación con express-validator.
-  Swagger documentado.

---

## 🛠 Tecnologías

| Frontend        | Backend          | Base de Datos |
|----------------|------------------|----------------|
| Angular 17      | Node.js + Express | MySQL          |
| Bootstrap 5     | JWT               |                |
| DataTables      | Swagger           |                |
| SweetAlert2     | express-validator |                |

---

## ⚙️ Requisitos Previos

-  Node.js 18+
-  Angular CLI
-  MySQL Server
-  Git

---

## 📦 Instalación

###  Backend (DATOSEMPLEADO.BE)
Modificar el archivo .env

 PORT=3000
- DB_HOST=localhost
- DB_USER=root
- DB_PASS=
- DB_NAME=TEST
- JWT_SECRET=claveempleados21

# Crear tabla en MySQL:

- CREATE DATABASE TEST;

 
CREATE TABLE COLABORADOR (

  IDCOLABORADOR INT(11) AUTO_INCREMENT PRIMARY KEY,
  
  NOMBRE VARCHAR(45) NOT NULL,
  
  APELLIDO VARCHAR(45) NOT NULL,
  
  DIRECCION VARCHAR(45),
  
  EDAD INT(3) NOT NULL,
  
  PROFESION VARCHAR(45),
  
  ESTADOCIVIL VARCHAR(45)
  
);


