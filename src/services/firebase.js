// Firebase configuration and services
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
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
 * Obtiene todos los productos usando getDocs
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
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);
    
    if (productSnap.exists()) {
      return {
        id: productSnap.id,
        ...productSnap.data()
      };
    } else {
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
    const q = query(
      productsRef, 
      where('category', '==', categoryId),
      where('isAvailable', '==', true)
    );
    
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
    throw new Error('Error al cargar productos de la categoría');
  }
};

/**
 * Busca productos por nombre o descripción usando query
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Promise<Array>} Array de productos que coinciden
 */
export const searchProducts = async (searchTerm) => {
  try {
    const productsRef = collection(db, 'products');
    // Note: Firestore no tiene búsqueda de texto completo nativa
    // Esta implementación obtiene todos los productos y filtra en cliente
    // Para búsqueda más avanzada se recomendaría usar Algolia o similar
    const querySnapshot = await getDocs(productsRef);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const searchLower = searchTerm.toLowerCase();
      
      if (
        data.name.toLowerCase().includes(searchLower) ||
        data.description.toLowerCase().includes(searchLower)
      ) {
        products.push({
          id: doc.id,
          ...data
        });
      }
    });
    
    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Error al buscar productos');
  }
};

// ========================
// ORDERS SERVICES
// ========================

/**
 * Crea una nueva orden en Firestore usando addDoc
 * @param {Object} orderData - Datos de la orden
 * @returns {Promise<Object>} Orden creada con ID
 */
export const createOrder = async (orderData) => {
  try {
    const ordersRef = collection(db, 'orders');
    
    // Generar código único para la orden
    const orderCode = `PV-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    const orderToSave = {
      ...orderData,
      code: orderCode,
      status: 'pendiente',
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(ordersRef, orderToSave);
    
    return {
      id: docRef.id,
      ...orderToSave,
      createdAt: new Date() // Para el retorno inmediato
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Error al crear la orden');
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
 * Verifica la conexión con Firestore
 * @returns {Promise<boolean>} true si la conexión es exitosa
 */
export const testFirestoreConnection = async () => {
  try {
    const testRef = collection(db, 'test');
    await getDocs(testRef);
    return true;
  } catch (error) {
    console.error('Firestore connection failed:', error);
    return false;
  }
};

export default {
  // Products
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  
  // Orders
  createOrder,
  getOrderByCode,
  getAllOrders,
  getOrdersByStatus,
  
  // Utils
  testFirestoreConnection
}; 