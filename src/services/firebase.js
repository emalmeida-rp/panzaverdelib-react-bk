// Firebase configuration and services
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc,
  runTransaction,
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ========================
// PRODUCTS SERVICES
// ========================

/**
 * Obtiene todos los productos de Firestore usando getDocs
 * @returns {Promise<Array>} Array de productos
 */
export const getProducts = async () => {
  try {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error al cargar los productos');
  }
};

/**
 * Obtiene un producto por ID usando getDoc
 * @param {string} productId - ID del producto
 * @returns {Promise<Object|null>} Producto o null si no existe
 */
export const getProductById = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      console.log('No such product!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Error al cargar el producto');
  }
};

/**
 * Obtiene productos por categoría usando query + where
 * @param {string} categoryId - ID de la categoría
 * @returns {Promise<Array>} Array de productos de la categoría
 */
export const getProductsByCategory = async (categoryId) => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('category', '==', categoryId));
    
    const querySnapshot = await getDocs(q);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Error al cargar productos por categoría');
  }
};

/**
 * Busca productos por nombre usando query + where
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Promise<Array>} Array de productos que coinciden
 */
export const searchProducts = async (searchTerm) => {
  try {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      const product = { id: doc.id, ...doc.data() };
      if (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        products.push(product);
      }
    });
    
    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Error al buscar productos');
  }
};

/**
 * Verifica si hay stock suficiente para los items del carrito
 * @param {Array} cartItems - Items del carrito
 * @returns {Promise<Object>} {hasStock: boolean, outOfStockItems: Array}
 */
export const checkStockAvailability = async (cartItems) => {
  try {
    const outOfStockItems = [];
    
    for (const item of cartItems) {
      const product = await getProductById(item.id);
      if (!product || product.stock < item.quantity) {
        outOfStockItems.push({
          ...item,
          availableStock: product?.stock || 0
        });
      }
    }
    
    return {
      hasStock: outOfStockItems.length === 0,
      outOfStockItems
    };
  } catch (error) {
    console.error('Error checking stock:', error);
    throw new Error('Error al verificar el stock');
  }
};

/**
 * Decrementa el stock de productos usando transaction
 * @param {Array} orderItems - Items de la orden con {product: id, quantity: number}
 * @returns {Promise<void>}
 */
export const decrementProductStock = async (orderItems) => {
  try {
    console.log('🔄 Iniciando transaction para decrementar stock...');
    console.log('📋 Items recibidos:', orderItems);
    
    await runTransaction(db, async (transaction) => {
      // Leer todos los productos primero
      console.log('📖 Leyendo productos desde Firestore...');
      const productRefs = orderItems.map(item => {
        console.log(`🔗 Creando referencia para producto: ${item.product}`);
        return doc(db, 'products', item.product);
      });
      
      const productDocs = await Promise.all(
        productRefs.map(ref => transaction.get(ref))
      );
      console.log(`📦 Leídos ${productDocs.length} productos`);
      
      // Verificar stock y preparar actualizaciones
      const updates = [];
      for (let i = 0; i < productDocs.length; i++) {
        const productDoc = productDocs[i];
        const orderItem = orderItems[i];
        
        console.log(`🔍 Procesando item ${i + 1}:`, {
          productId: orderItem.product,
          quantity: orderItem.quantity,
          exists: productDoc.exists()
        });
        
        if (!productDoc.exists()) {
          throw new Error(`Producto ${orderItem.product} no encontrado`);
        }
        
        const productData = productDoc.data();
        const currentStock = productData.stock || 0;
        const newStock = currentStock - orderItem.quantity;
        
        console.log(`📊 Stock para ${productData.name}:`, {
          stockActual: currentStock,
          cantidad: orderItem.quantity,
          stockNuevo: newStock
        });
        
        if (newStock < 0) {
          throw new Error(`Stock insuficiente para ${productData.name}. Stock actual: ${currentStock}`);
        }
        
        updates.push({
          ref: productRefs[i],
          newStock,
          productName: productData.name
        });
      }
      
      // Aplicar todas las actualizaciones
      console.log('💾 Aplicando actualizaciones de stock...');
      updates.forEach(update => {
        console.log(`📝 Actualizando ${update.productName}: ${update.newStock} unidades`);
        transaction.update(update.ref, { 
          stock: update.newStock,
          updatedAt: serverTimestamp()
        });
      });
    });
    
    console.log('✅ Stock actualizado correctamente en todos los productos');
  } catch (error) {
    console.error('❌ Error decrementando stock:', error);
    console.error('🔍 Detalles del error:', { 
      message: error.message, 
      orderItems 
    });
    throw new Error(error.message || 'Error al actualizar el stock');
  }
};

// ========================
// ORDERS SERVICES
// ========================

// Estados disponibles para pedidos
export const ORDER_STATES = {
  PENDING: 'pendiente',
  CONFIRMED: 'confirmado',
  PREPARING: 'preparando',
  SHIPPED: 'enviado',
  DELIVERED: 'entregado',
  CANCELLED: 'cancelado'
};

// Mapeo de estados a texto amigable
export const ORDER_STATES_LABELS = {
  [ORDER_STATES.PENDING]: '⏳ Pendiente',
  [ORDER_STATES.CONFIRMED]: '✅ Confirmado',
  [ORDER_STATES.PREPARING]: '📦 Preparando',
  [ORDER_STATES.SHIPPED]: '🚚 Enviado',
  [ORDER_STATES.DELIVERED]: '🎉 Entregado',
  [ORDER_STATES.CANCELLED]: '❌ Cancelado'
};

/**
 * Crea una nueva orden en Firestore con control de stock
 * @param {Object} orderData - Datos de la orden
 * @returns {Promise<Object>} Orden creada con ID
 */
export const createOrder = async (orderData) => {
  try {
    console.log('🛒 Iniciando creación de orden...', { orderData });
    
    // 1. Verificar stock disponible
    console.log('📦 Verificando stock disponible...');
    const stockCheck = await checkStockAvailability(
      orderData.items.map(item => ({
        id: item.product,
        quantity: item.quantity
      }))
    );
    
    if (!stockCheck.hasStock) {
      const outOfStockNames = stockCheck.outOfStockItems
        .map(item => `${item.name || item.id} (disponible: ${item.availableStock})`)
        .join(', ');
      throw new Error(`Stock insuficiente para: ${outOfStockNames}`);
    }
    console.log('✅ Stock verificado correctamente');
    
    // 2. Crear la orden
    console.log('📝 Creando orden en Firestore...');
    const ordersRef = collection(db, 'orders');
    const orderCode = `PV-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    const now = new Date();
    
    const orderToSave = {
      ...orderData,
      code: orderCode,
      status: ORDER_STATES.PENDING,
      statusHistory: [{
        status: ORDER_STATES.PENDING,
        date: now, // Usar Date() en lugar de serverTimestamp() en arrays
        comment: 'Pedido recibido'
      }],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(ordersRef, orderToSave);
    console.log('✅ Orden creada en Firestore con ID:', docRef.id);
    
    // 3. Decrementar stock
    console.log('📉 Decrementando stock de productos...');
    console.log('Items a procesar:', orderData.items);
    await decrementProductStock(orderData.items);
    
    console.log('🎉 Orden creada y stock actualizado exitosamente');
    
    return {
      id: docRef.id,
      ...orderToSave,
      createdAt: now,
      updatedAt: now,
      statusHistory: [{
        status: ORDER_STATES.PENDING,
        date: now,
        comment: 'Pedido recibido'
      }]
    };
  } catch (error) {
    console.error('❌ Error creating order:', error);
    throw new Error(error.message || 'Error al crear la orden');
  }
};

/**
 * Actualiza el estado de una orden
 * @param {string} orderId - ID de la orden
 * @param {string} newStatus - Nuevo estado
 * @param {string} comment - Comentario opcional
 * @returns {Promise<void>}
 */
export const updateOrderStatus = async (orderId, newStatus, comment = '') => {
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
    
    console.log(`✅ Estado de orden actualizado a: ${newStatus}`);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Error al actualizar el estado de la orden');
  }
};

/**
 * Obtiene una orden por su código usando query + where
 * @param {string} orderCode - Código de la orden
 * @returns {Promise<Object|null>} Orden o null si no existe
 */
export const getOrderByCode = async (orderCode) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('code', '==', orderCode));
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.error('Error fetching order by code:', error);
    throw new Error('Error al cargar la orden');
  }
};

/**
 * Obtiene todas las órdenes ordenadas por fecha usando query + orderBy
 * @returns {Promise<Array>} Array de órdenes
 */
export const getAllOrders = async () => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Error al cargar las órdenes');
  }
};

/**
 * Obtiene órdenes por estado usando query + where
 * @param {string} status - Estado de la orden
 * @returns {Promise<Array>} Array de órdenes con el estado especificado
 */
export const getOrdersByStatus = async (status) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef, 
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return orders;
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    throw new Error('Error al cargar órdenes por estado');
  }
};

// ========================
// UTILITY FUNCTIONS
// ========================

/**
 * Función de prueba para verificar la conexión a Firestore
 * @returns {Promise<boolean>} true si la conexión es exitosa
 */
export const testFirestoreConnection = async () => {
  try {
    const testRef = collection(db, 'test');
    await getDocs(testRef);
    console.log('✅ Conexión a Firestore exitosa');
    return true;
  } catch (error) {
    console.error('❌ Error de conexión a Firestore:', error);
    return false;
  }
};

export default {
  // Products
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  checkStockAvailability,
  decrementProductStock,
  
  // Orders
  createOrder,
  updateOrderStatus,
  getOrderByCode,
  getAllOrders,
  getOrdersByStatus,
  ORDER_STATES,
  ORDER_STATES_LABELS,
  
  // Utils
  testFirestoreConnection
}; 