// Script para poblar Firestore con productos de la librería
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';

// Configuración Firebase - REEMPLAZA CON TUS VALORES REALES
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Productos de ejemplo para la librería
const productos = [
  {
    name: "Cuaderno Rivadavia A4 Rayado",
    description: "Cuaderno tapa dura A4 de 84 hojas rayadas. Ideal para estudiantes y profesionales.",
    price: 850,
    category: "escolar",
    image: "/img/cuaderno-rivadavia.webp",
    stock: 50,
    isAvailable: true
  },
  {
    name: "Lapiceras BIC Cristal Pack x3",
    description: "Pack de 3 lapiceras BIC Cristal azules. Clásicas y confiables para uso diario.",
    price: 420,
    category: "libreria",
    image: "/img/lapiceras-color-bic.jpeg",
    stock: 75,
    isAvailable: true
  },
  {
    name: "Lápiz Faber-Castell HB",
    description: "Lápiz grafito HB de alta calidad para escritura y dibujo técnico.",
    price: 180,
    category: "libreria",
    image: "/img/lapiz-faber-comun.jpeg",
    stock: 120,
    isAvailable: true
  },
  {
    name: "Tijeras Escolares Maped",
    description: "Tijeras de punta redonda, ideales para niños. Mango ergonómico y corte preciso.",
    price: 650,
    category: "escolar",
    image: "/img/maped-tijeras-escolares.png",
    stock: 30,
    isAvailable: true
  },
  {
    name: "Marcadores Stabilo Boss Pack x4",
    description: "Set de 4 marcadores resaltadores en colores amarillo, verde, rosa y naranja.",
    price: 890,
    category: "libreria",
    image: "/img/marcadores-tabilo.jpg",
    stock: 45,
    isAvailable: true
  },
  {
    name: "Cartulinas Obra Pack x10",
    description: "Pack de 10 cartulinas de colores variados. Perfectas para manualidades y proyectos.",
    price: 380,
    category: "escolar",
    image: "/img/cartulinas.jpeg",
    stock: 25,
    isAvailable: true
  },
  {
    name: "Crayones de Cera Filgo x12",
    description: "Caja de 12 crayones de cera de colores brillantes. No tóxicos, ideales para niños.",
    price: 290,
    category: "escolar",
    image: "/img/crayones-cera-filgo.jpeg",
    stock: 60,
    isAvailable: true
  },
  {
    name: "Regla Plástica 30cm",
    description: "Regla transparente de 30cm con medidas en centímetros y milímetros.",
    price: 150,
    category: "escolar",
    image: "/img/regla-30cm.webp",
    stock: 80,
    isAvailable: true
  },
  {
    name: "Goma de Borrar Faber-Castell",
    description: "Goma de borrar blanca, libre de PVC. Borra limpiamente sin dañar el papel.",
    price: 120,
    category: "libreria",
    image: "/img/goma-faber.webp",
    stock: 100,
    isAvailable: true
  },
  {
    name: "Compás Escolar Metálico",
    description: "Compás metálico para dibujo técnico y geométrico. Incluye lápiz de repuesto.",
    price: 450,
    category: "libreria",
    image: "/img/compas-metalico.webp",
    stock: 20,
    isAvailable: true
  },
  {
    name: "Plastificado A4 (por hoja)",
    description: "Servicio de plastificado en caliente para documentos tamaño A4.",
    price: 200,
    category: "servicios",
    image: "/img/plastificado.jpg",
    stock: 999,
    isAvailable: true
  },
  {
    name: "Fotocopias B/N (por hoja)",
    description: "Fotocopias en blanco y negro de alta calidad. Precio por hoja.",
    price: 25,
    category: "servicios",
    image: "/img/fotocopias-bn.webp",
    stock: 999,
    isAvailable: true
  },
  {
    name: "Fotocopias Color (por hoja)",
    description: "Fotocopias a color con tecnología láser. Precio por hoja.",
    price: 80,
    category: "servicios",
    image: "/img/fotocopias-color.jpg",
    stock: 999,
    isAvailable: true
  },
  {
    name: "Anillado Espiral A4",
    description: "Servicio de anillado espiral para documentos tamaño A4. Incluye tapa transparente.",
    price: 350,
    category: "servicios",
    image: "/img/anillado.webp",
    stock: 999,
    isAvailable: true
  },
  {
    name: "Impresión Fotos 10x15cm",
    description: "Impresión de fotografías digitales en papel fotográfico de calidad.",
    price: 150,
    category: "servicios",
    image: "/img/fotos.jpg",
    stock: 999,
    isAvailable: true
  }
];

// Función para poblar la colección de productos
async function poblarProductos() {
  console.log('🔥 Iniciando población de Firestore...');
  
  try {
    const productosRef = collection(db, 'products');
    
    for (const producto of productos) {
      const docRef = await addDoc(productosRef, {
        ...producto,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ Producto agregado: ${producto.name} (ID: ${docRef.id})`);
    }
    
    console.log('🎉 ¡Todos los productos han sido agregados exitosamente!');
    console.log(`📊 Total de productos: ${productos.length}`);
    
    // Crear una orden de ejemplo
    await crearOrdenEjemplo();
    
  } catch (error) {
    console.error('❌ Error al poblar productos:', error);
  }
}

// Función para crear una orden de ejemplo
async function crearOrdenEjemplo() {
  try {
    const ordenesRef = collection(db, 'orders');
    
    const ordenEjemplo = {
      code: `PV-${Date.now()}-DEMO`,
      userName: "Juan Pérez",
      userEmail: "juan.perez@email.com",
      userPhone: "+54 9 11 1234-5678",
      userAddress: "Av. Corrientes 1234, CABA",
      comments: "Entregar en horario de oficina por favor",
      items: [
        {
          product: "demo-product-1",
          quantity: 2,
          price: 850
        },
        {
          product: "demo-product-2", 
          quantity: 1,
          price: 420
        }
      ],
      total: 2120,
      status: "pendiente",
      createdAt: new Date()
    };
    
    const docRef = await addDoc(ordenesRef, ordenEjemplo);
    console.log(`✅ Orden de ejemplo creada (ID: ${docRef.id})`);
    
  } catch (error) {
    console.error('❌ Error al crear orden de ejemplo:', error);
  }
}

// Ejecutar el script
if (import.meta.url === `file://${process.argv[1]}`) {
  poblarProductos()
    .then(() => {
      console.log('✨ Script completado exitosamente');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Error en el script:', error);
      process.exit(1);
    });
}

export { poblarProductos }; 