import { Link } from 'react-router-dom';
import { useImageHandler } from '../hooks/useImageHandler';

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

  return (
    <div className="card h-100">
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
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted small flex-grow-1">
          {product.description?.substring(0, 100)}...
        </p>
        <div className="mt-auto">
          <p className="card-text fw-bold text-success fs-5 mb-2">
            ${product.price?.toLocaleString('es-AR')}
          </p>
          <Link to={`/item/${product.id}`} className="btn btn-primary w-100">
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item; 