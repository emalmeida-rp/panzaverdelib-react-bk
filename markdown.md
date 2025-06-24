# 📚 Librería Panza Verde - React E-commerce

Una aplicación web moderna de e-commerce para la Librería Panza Verde, desarrollada con React, Vite, Firebase y Bootstrap.

## 🚀 Características Principales

- **🛒 E-commerce completo** con carrito de compras funcional
- **🔥 Firebase/Firestore** como backend y base de datos
- **📱 Responsive Design** con Bootstrap 5
- **⚡ SPA (Single Page Application)** con React Router
- **🎨 Interfaz moderna** con animaciones CSS y AOS
- **🔔 Sistema de notificaciones** con AlertToast y SweetAlert2
- **🖼️ Placeholders SVG** dinámicos para productos
- **📦 Optimizado** siguiendo principios DRY, KISS, YAGNI

## 📋 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (incluido con Node.js)
- **Git** - [Descargar aquí](https://git-scm.com/)

## 🛠️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd panzaverdelib-react-bk-master
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Firebase

#### 3.1 Crear Proyecto Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado "panzaverde-react"
3. Habilita Firestore Database
4. Configura las reglas de Firestore (modo público para desarrollo):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

#### 3.2 Obtener Credenciales
1. Ve a Configuración del proyecto > General
2. En "Tus apps" agrega una app web
3. Copia las credenciales de configuración

#### 3.3 Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain_aqui
VITE_FIREBASE_PROJECT_ID=tu_project_id_aqui
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket_aqui
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id_aqui
VITE_FIREBASE_APP_ID=tu_app_id_aqui
```

### 4. Poblar la Base de Datos

Ejecuta el script para cargar productos de ejemplo:

```bash
npm run populate-firestore
```

## 🏃‍♂️ Ejecutar el Proyecto

### Modo Desarrollo
```bash
npm run dev
```
El proyecto estará disponible en: `http://localhost:5173/`

### Modo Producción
```bash
# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── AlertToast.jsx   # Notificaciones toast
│   ├── CartItem.jsx     # Item del carrito
│   ├── CartWidget.jsx   # Widget flotante del carrito
│   ├── CheckoutForm.jsx # Formulario de checkout
│   ├── Footer.jsx       # Pie de página
│   ├── Item.jsx         # Card de producto
│   ├── ItemCount.jsx    # Contador de cantidad
│   ├── ItemDetail.jsx   # Detalle de producto
│   ├── ItemList.jsx     # Lista de productos
│   ├── LoadingGrid.jsx  # Grid de loading
│   ├── Navbar.jsx       # Barra de navegación
│   └── ProductDetailModal.jsx # Modal de producto
├── context/             # Contextos de React
│   ├── AlertContext.jsx # Context para alertas
│   └── CartContext.jsx  # Context del carrito
├── hooks/               # Custom hooks
│   └── useImageHandler.js # Hook para manejo de imágenes
├── pages/               # Páginas principales
│   ├── Cart.jsx         # Página del carrito
│   ├── Contact.jsx      # Página de contacto
│   ├── Gallery.jsx      # Galería de imágenes
│   ├── History.jsx      # Historia de la librería
│   ├── Home.jsx         # Página principal
│   ├── OrderConfirmation.jsx # Confirmación de pedido
│   └── ProductsPage.jsx # Página de productos
├── services/            # Servicios externos
│   └── firebase.js      # Configuración Firebase
├── utils/               # Utilidades
│   ├── api.js          # Utilidades de API
│   └── placeholderUtils.js # Generador de placeholders SVG
└── assets/             # Recursos estáticos
    ├── images/         # Imágenes
    └── styles/         # Estilos SCSS
```

## 🔧 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Ejecuta el servidor de desarrollo |
| `npm run build` | Construye la app para producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta ESLint para revisar código |
| `npm run populate-firestore` | Pobla Firestore con datos de ejemplo |

## 📦 Dependencias Principales

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| `react` | ^19.0.0 | Framework principal |
| `react-router-dom` | ^7.5.3 | Navegación SPA |
| `firebase` | ^11.9.1 | Backend y base de datos |
| `bootstrap` | ^5.3.6 | Framework CSS |
| `react-bootstrap` | ^2.10.9 | Componentes Bootstrap para React |
| `sweetalert2` | ^11.6.13 | Alertas elegantes |
| `aos` | ^2.3.4 | Animaciones on scroll |
| `@tanstack/react-query` | ^5.77.2 | Gestión de estado server |
| `sass` | ^1.87.0 | Preprocesador CSS |

## 🎨 Características Técnicas

### ✅ **Funcionalidades Implementadas:**
- Carrito de compras persistente
- Sistema de pedidos con Firebase
- Confirmaciones elegantes con SweetAlert2
- Notificaciones toast personalizadas
- Placeholders SVG dinámicos por categoría
- Responsive design completo
- Navegación SPA optimizada

### ✅ **Optimizaciones Aplicadas:**
- **DRY**: Componentes reutilizables y utilidades centralizadas
- **KISS**: Componentes simples y funcionales
- **YAGNI**: Solo funcionalidades esenciales
- **Alias @/**: Imports limpios y mantenibles
- **Código optimizado**: ~280 líneas eliminadas de duplicación

## 🚨 Solución de Problemas

### Error: "Module not found"
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: Firebase connection
1. Verifica que las variables de entorno estén correctas
2. Asegúrate de que Firestore esté habilitado
3. Revisa las reglas de seguridad de Firestore

### Puerto 5173 ocupado
Vite automáticamente usará el siguiente puerto disponible (5174, 5175, etc.)

## 📞 Contacto y Soporte

- **Librería:** Panza Verde
- **WhatsApp:** [Contactar](https://wa.me/message/OICVOUY5BK7OL1)
- **Facebook:** [Página oficial](https://www.facebook.com/share/1APNL6PYST/)
- **Instagram:** [@libreriapanzaverde](https://www.instagram.com/libreriapanzaverde/)

## 📄 Licencia

Este proyecto es de uso privado para Librería Panza Verde™. Todos los derechos reservados.

---

## 🚀 ¡Listo para usar!

Una vez completados todos los pasos, tendrás una aplicación e-commerce completamente funcional. El proyecto incluye datos de ejemplo y está optimizado para desarrollo y producción.

**¿Necesitas ayuda?** Revisa la documentación o contacta al equipo de desarrollo.
