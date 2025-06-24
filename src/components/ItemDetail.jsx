import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCount from './ItemCount';
import { useCart } from '../context/CartContext';
import { useAlert } from '../context/AlertContext';
import { useImageHandler } from '../hooks/useImageHandler';

// Componente optimizado aplicando principios DRY, KISS y YAGNI
const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const { addToCart, getItemQuantity } = useCart();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // Hook personalizado elimina duplicación de lógica de imágenes
  const { 
    imageError, 
    imageLoading, 
    placeholderImage, 
    handleImageError, 
    handleImageLoad 
  } = useImageHandler(product.name, 'detail');

  const currentQuantity = getItemQuantity(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const availableToAdd = product.stock - currentQuantity;

  // Lógica simplificada del carrito (KISS principle)
  const handleAddToCart = (count) => {
    if (currentQuantity + count > product.stock) {
      showAlert(`Solo hay ${product.stock} unidades disponibles y ya tienes ${currentQuantity} en el carrito`, 'warning');
      return;
    }

    setQuantity(count);
    addToCart(product, count);
    showAlert(`¡${count} ${count === 1 ? 'unidad agregada' : 'unidades agregadas'} al carrito!`, 'success');
  };

  const handleContinueShopping = () => {
    // Volver a la página de productos manteniendo la categoría si existe
    if (product.category) {
      navigate(`/category/${product.category}`);
    } else {
      navigate('/products');
    }
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const getStockBadge = () => {
    if (isOutOfStock) {
      return <span className="badge bg-danger fs-6">Sin stock</span>;
    }
    if (isLowStock) {
      return <span className="badge bg-warning text-dark fs-6">Últimas {product.stock} unidades</span>;
    }
    return <span className="badge bg-success fs-6">{product.stock} disponibles</span>;
  };

  const getStockColor = () => {
    if (isOutOfStock) return 'text-danger';
    if (isLowStock) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-6">
          <div className="position-relative">
            {imageLoading && (
              <div className="d-flex align-items-center justify-content-center bg-light rounded" style={{ height: '400px' }}>
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
            {isOutOfStock && (
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 rounded">
                <span className="badge bg-danger fs-3">AGOTADO</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h1 className="h2 mb-0">{product.name}</h1>
            {getStockBadge()}
          </div>
          
          <p className="lead text-muted mb-4">{product.description}</p>
          
          <div className="mb-4">
            <span className="display-6 fw-bold text-success">${product.price?.toLocaleString('es-AR')}</span>
          </div>
          
          {/* Información de stock detallada */}
          <div className="card border-0 bg-light mb-4">
            <div className="card-body">
              <h6 className="card-title text-success mb-2">
                <i className="bi bi-box-seam me-2"></i>
                Información de stock
              </h6>
              <div className="row g-2">
                <div className="col-6">
                  <small className={`fw-bold ${getStockColor()}`}>
                    Stock total: {product.stock} {product.stock === 1 ? 'unidad' : 'unidades'}
                  </small>
                </div>
                {currentQuantity > 0 && (
                  <div className="col-6">
                    <small className="text-info fw-bold">
                      En tu carrito: {currentQuantity}
                    </small>
                  </div>
                )}
                {!isOutOfStock && (
                  <div className="col-12">
                    <small className="text-muted">
                      Disponible para agregar: {availableToAdd} {availableToAdd === 1 ? 'unidad' : 'unidades'}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Control de cantidad y agregar al carrito */}
          {quantity === 0 ? (
            <>
              {isOutOfStock ? (
                <div className="alert alert-warning">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  <strong>Producto agotado</strong><br/>
                  Este producto no tiene stock disponible en este momento.
                </div>
              ) : (
                <div className="mb-3">
                  <ItemCount 
                    stock={availableToAdd} 
                    initial={1} 
                    onAdd={handleAddToCart} 
                  />
                  <div className="form-text">
                    Máximo {availableToAdd} {availableToAdd === 1 ? 'unidad' : 'unidades'} disponibles
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="mb-3">
              <div className="alert alert-success">
                <i className="bi bi-check-circle me-2"></i>
                <strong>¡Agregado al carrito!</strong><br/>
                {quantity} {quantity === 1 ? 'unidad agregada' : 'unidades agregadas'} exitosamente.
              </div>
              
              {/* Botones de acción después de agregar */}
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <button
                  className="btn btn-outline-success"
                  onClick={handleContinueShopping}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Seguir comprando
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleGoToCart}
                >
                  <i className="bi bi-cart-check me-2"></i>
                  Ver carrito ({currentQuantity + quantity})
                </button>
              </div>
            </div>
          )}
          
          {/* Información adicional */}
          <div className="mt-4">
            <h6 className="text-success mb-2">
              <i className="bi bi-info-circle me-2"></i>
              Información adicional
            </h6>
            <ul className="list-unstyled small text-muted">
              <li><i className="bi bi-truck me-2"></i>Envío disponible en la zona</li>
              <li><i className="bi bi-shield-check me-2"></i>Garantía de calidad</li>
              <li><i className="bi bi-whatsapp me-2"></i>Consultas por WhatsApp</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail; 