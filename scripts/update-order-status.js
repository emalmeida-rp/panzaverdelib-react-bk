// Script para actualizar estados de pedidos manualmente (testing)
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  query,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Firebase configuration usando variables de entorno
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Verificar que las variables estén definidas
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN', 
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Error: Variable de entorno ${envVar} no está definida`);
    console.error('Por favor, crea un archivo .env con todas las variables de Firebase');
    process.exit(1);
  }
}

console.log('✅ Variables de entorno cargadas correctamente');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Estados disponibles
const ORDER_STATES = {
  PENDING: 'pendiente',
  CONFIRMED: 'confirmado',
  PREPARING: 'preparando',
  SHIPPED: 'enviado',
  DELIVERED: 'entregado',
  CANCELLED: 'cancelado'
};

const ORDER_STATES_LABELS = {
  [ORDER_STATES.PENDING]: '⏳ Pendiente',
  [ORDER_STATES.CONFIRMED]: '✅ Confirmado',
  [ORDER_STATES.PREPARING]: '📦 Preparando',
  [ORDER_STATES.SHIPPED]: '🚚 Enviado',
  [ORDER_STATES.DELIVERED]: '🎉 Entregado',
  [ORDER_STATES.CANCELLED]: '❌ Cancelado'
};

/**
 * Lista todas las órdenes
 */
async function listarOrdenes() {
  try {
    console.log('📋 Listando todas las órdenes...\n');
    
    const ordersRef = collection(db, 'orders');
    const querySnapshot = await getDocs(ordersRef);
    
    if (querySnapshot.empty) {
      console.log('❌ No se encontraron órdenes');
      return [];
    }
    
    const orders = [];
    querySnapshot.forEach((doc) => {
      const order = { id: doc.id, ...doc.data() };
      orders.push(order);
      
      console.log(`🔸 ID: ${order.id}`);
      console.log(`   Código: ${order.code}`);
      console.log(`   Cliente: ${order.userName}`);
      console.log(`   Estado: ${ORDER_STATES_LABELS[order.status] || order.status}`);
      console.log(`   Total: $${order.total}`);
      console.log('');
    });
    
    return orders;
  } catch (error) {
    console.error('❌ Error listando órdenes:', error);
    return [];
  }
}

/**
 * Actualiza el estado de una orden
 */
async function actualizarEstadoOrden(orderId, newStatus, comment = '') {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);
    
    if (!orderDoc.exists()) {
      throw new Error('Orden no encontrada');
    }
    
    const currentOrder = orderDoc.data();
    const newStatusEntry = {
      status: newStatus,
      date: serverTimestamp(),
      comment: comment || ORDER_STATES_LABELS[newStatus]
    };
    
    await updateDoc(orderRef, {
      status: newStatus,
      statusHistory: [...(currentOrder.statusHistory || []), newStatusEntry],
      updatedAt: serverTimestamp()
    });
    
    console.log(`✅ Estado actualizado: ${ORDER_STATES_LABELS[newStatus]}`);
    console.log(`📝 Comentario: ${comment || 'Estado actualizado automáticamente'}`);
    
  } catch (error) {
    console.error('❌ Error actualizando estado:', error);
    throw error;
  }
}

/**
 * Simula el flujo completo de una orden
 */
async function simularFlujoOrden(orderId) {
  try {
    console.log(`🚀 Iniciando simulación de flujo para orden: ${orderId}\n`);
    
    const estados = [
      { status: ORDER_STATES.CONFIRMED, comment: 'Pedido confirmado por el equipo', delay: 1000 },
      { status: ORDER_STATES.PREPARING, comment: 'Preparando productos para envío', delay: 2000 },
      { status: ORDER_STATES.SHIPPED, comment: 'Pedido enviado - En camino', delay: 2000 },
      { status: ORDER_STATES.DELIVERED, comment: 'Pedido entregado exitosamente', delay: 1000 }
    ];
    
    for (const estado of estados) {
      console.log(`⏳ Actualizando a: ${ORDER_STATES_LABELS[estado.status]}`);
      await actualizarEstadoOrden(orderId, estado.status, estado.comment);
      
      // Esperar antes del siguiente estado
      await new Promise(resolve => setTimeout(resolve, estado.delay));
    }
    
    console.log('\n🎉 ¡Simulación completada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error en simulación:', error);
  }
}

/**
 * Función principal
 */
async function main() {
  try {
    console.log('🔥 SCRIPT DE ACTUALIZACIÓN DE ESTADOS DE PEDIDOS\n');
    console.log('================================================\n');
    
    // Listar órdenes disponibles
    const orders = await listarOrdenes();
    
    if (orders.length === 0) {
      console.log('❌ No hay órdenes para procesar');
      return;
    }
    
    // Tomar la primera orden pendiente para la demo
    const pendingOrder = orders.find(order => order.status === ORDER_STATES.PENDING);
    
    if (pendingOrder) {
      console.log(`🎯 Procesando orden pendiente: ${pendingOrder.code}\n`);
      await simularFlujoOrden(pendingOrder.id);
    } else {
      console.log('ℹ️ No hay órdenes pendientes para procesar');
      
      // Mostrar ejemplo de uso manual
      console.log('\n📖 USO MANUAL:');
      console.log('Para actualizar manualmente una orden, usa:');
      console.log('await actualizarEstadoOrden("ORDER_ID", ORDER_STATES.CONFIRMED, "Comentario opcional");');
      console.log('\nEstados disponibles:');
      Object.entries(ORDER_STATES_LABELS).forEach(([key, label]) => {
        console.log(`  - ${key}: ${label}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error en script principal:', error);
  }
}

// Funciones exportadas para uso manual
export {
  listarOrdenes,
  actualizarEstadoOrden,
  simularFlujoOrden,
  ORDER_STATES,
  ORDER_STATES_LABELS
};

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 