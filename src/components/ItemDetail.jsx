import { useState } from 'react';
import ItemCount from './ItemCount';
import { useCart } from '../context/CartContext';
import { useImageHandler } from '../hooks/useImageHandler';

// Componente optimizado aplicando principios DRY, KISS y YAGNI
const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCart();

  // Hook personalizado elimina duplicación de lógica de imágenes
  const { 
    imageError, 
    imageLoading, 
    placeholderImage, 
    handleImageError, 
    handleImageLoad 
  } = useImageHandler(product.name, 'detail');

  // Lógica simplificada del carrito (KISS principle)
  const handleAddToCart = (count) => {
    setQuantity(count);
    addToCart(product, count);
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="position-relative">
          {imageLoading && (
            <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '400px' }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando imagen...</span>
              </div>
            </div>
          )}
          <img 
            src={imageError ? placeholderImage : product.image} 
            className="img-fluid rounded shadow" 
            alt={product.name}
            style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        </div>
      </div>
      <div className="col-md-6">
        <h2>{product.name}</h2>
        <p className="lead">{product.description}</p>
        <p className="h3">${product.price}</p>
        <p>Stock disponible: {product.stock}</p>
        {quantity === 0 ? (
          <ItemCount 
            stock={product.stock} 
            initial={1} 
            onAdd={handleAddToCart} 
          />
        ) : (
          <div className="alert alert-success">
            ¡Agregaste {quantity} unidades al carrito!
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail; 