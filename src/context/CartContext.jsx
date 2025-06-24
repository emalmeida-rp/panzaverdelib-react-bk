import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product, quantity = 1) => {
    console.log('🛒 Agregando al carrito:', { product, quantity });
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        // Si ya está y hay stock disponible, actualiza la cantidad
        if (found.quantity + quantity <= product.stock) {
          const newCart = prev.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          );
          console.log('📦 Carrito actualizado (producto existente):', newCart);
          return newCart;
        }
        console.log('⚠️ No se puede agregar más - stock insuficiente');
        return prev; // Si no hay stock suficiente, no hace nada
      } else {
        // Si no está, lo agrega con la cantidad especificada
        const newCart = [...prev, { ...product, quantity }];
        console.log('📦 Carrito actualizado (producto nuevo):', newCart);
        return newCart;
      }
    });
  };

  // Alias para addToCart (compatibilidad)
  const addItem = (product, quantity = 1) => {
    console.log('🎯 addItem llamado (alias para addToCart)');
    addToCart(product, quantity);
  };

  // Quitar producto del carrito
  const removeFromCart = (productId) => {
    console.log('🗑️ Eliminando del carrito:', productId);
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== productId);
      console.log('📦 Carrito después de eliminar:', newCart);
      return newCart;
    });
  };

  // Cambiar cantidad
  const updateQuantity = (productId, quantity, maxStock) => {
    console.log('📊 Actualizando cantidad:', { productId, quantity, maxStock });
    if (quantity < 1 || quantity > maxStock) {
      console.log('⚠️ Cantidad inválida, no se actualiza');
      return;
    }
    setCart(prev => {
      const newCart = prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      console.log('📦 Carrito después de actualizar cantidad:', newCart);
      return newCart;
    });
  };

  // Vaciar carrito
  const clearCart = () => {
    console.log('🧹 Vaciando carrito');
    setCart([]);
  };

  // Calcular total
  const getTotal = () => {
    const total = cart.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
    console.log('💰 Total calculado:', total);
    return total;
  };

  // Cantidad total de productos en el carrito
  const getCartCount = () => {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    console.log('🔢 Cantidad total de items:', count);
    return count;
  };

  // Obtener cantidad de un producto específico en el carrito
  const getItemQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    const quantity = item ? item.quantity : 0;
    console.log(`🔍 Cantidad del producto ${productId}:`, quantity);
    return quantity;
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart,
      addItem, // Alias para compatibilidad
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getTotal,
      getCartCount,
      getItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}; 