# 🏪 Librería Panza Verde - E-commerce SPA

## 📋 Descripción del Proyecto

Aplicación web de e-commerce desarrollada en React como SPA (Single Page Application) para la Librería Panza Verde. Permite a los usuarios navegar por productos, agregarlos al carrito y realizar compras de forma intuitiva.

## 🎯 Objetivos

- Desarrollar el front-end de una webapp de tipo e-commerce con React
- Incorporar Firestore como base de datos
- Implementar navegación SPA sin recargas de página
- Crear una experiencia de usuario fluida y moderna

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework principal
- **React Router** - Navegación SPA
- **Firebase/Firestore** - Base de datos en la nube
- **Bootstrap 5** - Framework CSS
- **Vite** - Build tool
- **React Query** - Manejo de estado del servidor
- **SweetAlert2** - Alertas personalizadas
- **SCSS** - Preprocesador CSS

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── CartWidget.jsx   # Widget del carrito
│   ├── ItemCount.jsx    # Contador de productos
│   ├── ItemDetail.jsx   # Detalle del producto
│   ├── ItemDetailContainer.jsx
│   ├── ItemList.jsx     # Lista de productos
│   ├── ItemListContainer.jsx
│   ├── Navbar.jsx       # Barra de navegación
│   └── Footer.jsx       # Pie de página
├── context/             # Contextos de React
│   ├── CartContext.jsx  # Estado global del carrito
│   └── AlertContext.jsx # Sistema de alertas
├── pages/               # Páginas principales
│   ├── Home.jsx         # Página de inicio
│   ├── ProductsPage.jsx # Catálogo de productos
│   ├── Cart.jsx         # Carrito de compras
│   ├── Contact.jsx      # Contacto
│   ├── Gallery.jsx      # Galería
│   ├── History.jsx      # Historia
│   ├── OrderForm.jsx    # Formulario de pedido
│   └── OrderConfirmation.jsx
├── utils/               # Utilidades
│   └── api.js          # Configuración de API
└── assets/             # Recursos estáticos
    ├── images/         # Imágenes
    └── styles/         # Estilos SCSS
```

## 🔧 Funcionalidades Principales

### 📦 Gestión de Productos
- Listado de productos con filtros por categoría
- Vista detallada de cada producto
- Búsqueda por nombre y descripción
- Control de stock en tiempo real

### 🛒 Carrito de Compras
- Agregar/quitar productos del carrito
- Modificar cantidades con validación de stock
- Cálculo automático de totales
- Persistencia del estado del carrito

### 🧭 Navegación
- Rutas dinámicas: `/category/:categoryId`, `/item/:id`
- Navegación SPA sin recargas
- Indicadores visuales de ruta actual
- Responsive design para móviles

### 📋 Proceso de Compra
- Formulario con validación de campos
- Generación de ID único por pedido
- Confirmación visual al usuario
- Limpieza automática del carrito

## ⚙️ Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Cuenta de Firebase

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tuusuario/ProyectoFinal+TuApellido.git
cd ProyectoFinal+TuApellido
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear archivo `.env` en la raíz del proyecto:
```
VITE_API_URL=https://tu-api-url.com
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

5. **Construir para producción**
```bash
npm run build
```

## 🔥 Configuración de Firebase

### Estructura de Firestore

#### Colección `products`
```javascript
{
  name: string,
  description: string,
  price: number,
  image: string,
  stock: number,
  category: string,
  isAvailable: boolean,
  createdAt: timestamp
}
```

#### Colección `orders`
```javascript
{
  code: string,           // ID único del pedido
  userName: string,
  userEmail: string,
  userPhone: string,
  userAddress: string,
  items: [{
    product: reference,   // Referencia al producto
    quantity: number,
    price: number
  }],
  total: number,
  status: string,        // 'pendiente', 'procesando', 'enviado', 'completado'
  createdAt: timestamp
}
```

## 🎨 Patrones de Diseño Implementados

### Container/Presentational Pattern
- **Contenedores**: Manejan lógica y estado (ItemListContainer, ItemDetailContainer)
- **Presentacionales**: Solo muestran UI (ItemList, ItemDetail, Item)

### Context Pattern
- **CartContext**: Estado global del carrito sin elementos UI
- **AlertContext**: Sistema de notificaciones global

### Custom Hooks
- **useCart**: Hook para interactuar con el carrito
- **useAlert**: Hook para mostrar alertas

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Tests con coverage
npm run test:coverage
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno en Vercel
3. Deploy automático con cada push

### Netlify
1. Conectar repositorio a Netlify
2. Configurar build command: `npm run build`
3. Configurar publish directory: `dist`

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run preview      # Vista previa de build
npm run lint         # Análisis de código
npm run lint:fix     # Corrección automática
```

## 🔍 Características Técnicas

### Navegación SPA
- React Router para rutas dinámicas
- NavLinks con indicadores visuales
- useParams para parámetros de URL
- useEffect para detectar cambios

### Validaciones
- Validación de stock en ItemCount
- Validación de formularios de compra
- Manejo de errores de API
- Estados de carga condicionales

### Optimizaciones
- Lazy loading de componentes
- Debounce en búsquedas
- Memoización de cálculos
- Compresión de imágenes

## 🤝 Contribución

1. Fork el proyecto
2. Crear branch para nueva funcionalidad
3. Commit con mensaje descriptivo
4. Push al branch
5. Crear Pull Request

## 📞 Contacto

- **Librería Panza Verde**
- Email: info@panzaverde.com
- Teléfono: +54 9 11 1234-5678
- Dirección: Av. Ejemplo 123, Ciudad, Provincia

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🎯 Próximas Mejoras

- [ ] Implementar sistema de favoritos
- [ ] Agregar filtros avanzados
- [ ] Integrar sistema de reseñas
- [ ] Añadir chat en vivo
- [ ] Implementar PWA
- [ ] Agregar múltiples métodos de pago

---

**Desarrollado con ❤️ para Librería Panza Verde** 