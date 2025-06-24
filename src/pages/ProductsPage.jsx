import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItemListContainer from '@/components/ItemListContainer';
import styles from '@/components/ItemListContainer.module.scss';

const categories = [
  { id: 'libreria', name: 'Librería' },
  { id: 'escolar', name: 'Escolar' }
];

const ProductsPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="cart">
      <header className="text-center py-5">
        <h1>{categoryId ? `Productos - ${categoryId}` : 'Todos los productos'}</h1>
        <p className="lead">Desde aquí podrás autogestionar tus compras de artículos de librería o insumos escolares. ¡Ofrecemos distintos medios de pago, facilidad y precios imbatibles!</p>
      </header>
      <div className="container">
        <div className="mb-4">
          <div className="input-group search-container">
            <span className="input-group-text search-icon">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Buscar productos por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="btn btn-outline-secondary clear-search" 
                onClick={() => setSearchTerm('')}
                type="button"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
          {/* Filtros de categoría */}
          <div className={styles.categoryFilterBar}>
            <button className={`${styles.categoryFilterBtn} ${!categoryId ? 'active' : ''}`} onClick={() => navigate('/productos')}>
              Todos
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`${styles.categoryFilterBtn} ${categoryId === cat.id ? 'active' : ''}`}
                onClick={() => navigate(`/category/${cat.id}`)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        {/* Solo el grid de productos se desmonta/remonta */}
        <ItemListContainer searchTerm={searchTerm} categoryId={categoryId} />
      </div>
    </div>
  );
};

export default ProductsPage; 