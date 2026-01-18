# Products Project 🛍️

Aplicación web para la gestión de productos con autenticación de usuarios. Permite crear, listar, editar y eliminar productos con un sistema de filtros avanzado.

## ✨ Características

- **Autenticación de usuarios**  
  Login y registro con JWT

- **Gestión completa de productos**  
  CRUD completo (Crear, Leer, Actualizar, Eliminar)

- **Sistema de filtros**  
  Búsqueda por nombre, precio y estado de oferta

- **Rutas protegidas**  
  Acceso controlado a páginas que requieren autenticación

- **Interfaz moderna**  
  Diseño responsive con Tailwind CSS

- **Validación de formularios**  
  Validación en tiempo real

- **Debounce en filtros**  
  Optimización de rendimiento en búsquedas

## 🛠️ Tecnologías

- React
- React Router para navegación
- Tailwind CSS para estilos
- Lucide React para iconos
- Vite como build tool

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/AlexAlgarate/Product-Project-React

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

```

## ⚙️ Configuración

Crear un archivo .env en la raíz del proyecto:

```bash
VITE_API_URL=http://localhost:8000
VITE_AUTH_URL=http://localhost:8000
```

## 🚀 Scripts

```bash
# Desarrollo

npm run dev

# Build para producción

npm run build

# Preview del build

npm run preview
```

## 🔐 Autenticación

El token de autenticación se guarda en:

- localStorage — Si seleccionas "Recordarme"

- sessionStorage — Si no seleccionas "Recordarme"
