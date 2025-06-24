import { Link } from 'react-router-dom';
import { useImageHandler } from '../hooks/useImageHandler';
import { useCart } from '@/context/CartContext';
import { useAlert } from '@/context/AlertContext';

// Componente optimizado aplicando principios DRY, KISS y YAGNI
const Item = ({ product }) => {
  // Hook personalizado elimina duplicación de lógica de imágenes
  const { 
    imageError, 
    imageLoading, 
    placeholderImage, 
    handleImageError, 
    handleImageLoad 
  } = useImageHandler(product.name, 'card');

  const { addItem, getItemQuantity } = useCart();
  const { showAlert } = useAlert();
  
  const currentQuantity = getItemQuantity(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const canAddMore = currentQuantity < product.stock;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      showAlert('Este producto no tiene stock disponible', 'warning');
      return;
    }
    
    if (!canAddMore) {
      showAlert(`Solo hay ${product.stock} unidades disponibles y ya tienes ${currentQuantity} en el carrito`, 'warning');
      return;
    }

    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, description: product.description, category: product.category, stock: product.stock });
    showAlert(`${product.name} agregado al carrito`, 'success');
  };

  const getStockBadge = () => {
    if (isOutOfStock) {
      return <span className="badge bg-danger ms-2">Sin stock</span>;
    }
    if (isLowStock) {
      return <span className="badge bg-warning text-dark ms-2">Últimas {product.stock} unidades</span>;
    }
    return <span className="badge bg-success ms-2">{product.stock} disponibles</span>;
  };

  const getStockColor = () => {
    if (isOutOfStock) return 'text-danger';
    if (isLowStock) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className={`card h-100 shadow-sm border-0 ${isOutOfStock ? 'opacity-75' : ''}`}>
      <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
        {imageLoading && (
          <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center bg-light">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        )}
        <img 
          src={imageError ? placeholderImage : product.image} 
          className="card-img-top w-100 h-100" 
          alt={product.name}
          style={{ objectFit: 'cover' }}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        {isOutOfStock && (
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
            <span className="badge bg-danger fs-6">AGOTADO</span>
          </div>
        )}
      </div>
      
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0 flex-grow-1">{product.name}</h5>
          {getStockBadge()}
        </div>
        
        <p className="card-text text-muted small flex-grow-1">
          {product.description?.substring(0, 100)}...
        </p>
        
        <div className="mb-2">
          <span className="fw-bold text-success fs-5">
            ${product.price?.toLocaleString('es-AR')}
          </span>
        </div>
        
        <div className="mb-2">
          <small className={`fw-bold ${getStockColor()}`}>
            <i className="bi bi-box-seam me-1"></i>
            {isOutOfStock 
              ? 'Sin stock' 
              : `Stock: ${product.stock} ${product.stock === 1 ? 'unidad' : 'unidades'}`
            }
          </small>
          {currentQuantity > 0 && (
            <small className="d-block text-info">
              <i className="bi bi-cart-check me-1"></i>
              {currentQuantity} en tu carrito
            </small>
          )}
        </div>
        
        <div className="mt-auto">
          <div className="d-grid gap-2">
            <Link 
              to={`/item/${product.id}`} 
              className="btn btn-outline-primary btn-sm"
            >
              <i className="bi bi-eye me-1"></i>
              Ver detalles
            </Link>
            
            <button 
              className={`btn btn-sm ${isOutOfStock ? 'btn-secondary' : 'btn-success'}`}
              onClick={handleAddToCart}
              disabled={isOutOfStock || !canAddMore}
            >
              {isOutOfStock ? (
                <>
                  <i className="bi bi-x-circle me-1"></i>
                  Sin stock
                </>
              ) : !canAddMore ? (
                <>
                  <i className="bi bi-exclamation-triangle me-1"></i>
                  Stock máximo
                </>
              ) : (
                <>
                  <i className="bi bi-cart-plus me-1"></i>
                  Agregar al carrito
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item; 