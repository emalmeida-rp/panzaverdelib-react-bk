import { useEffect, useState } from 'react';
import { getProducts, getProductsByCategory } from '@/services/firebase';
import ItemList from './ItemList';
import LoadingGrid from './LoadingGrid';

// Componente optimizado aplicando principios DRY, KISS y YAGNI
const ItemListContainer = ({ searchTerm = '', categoryId = '' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const data = categoryId 
          ? await getProductsByCategory(categoryId)
          : await getProducts();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  useEffect(() => {
    if (searchTerm && filteredProducts.length === 0) {
      setShowNoResults(true);
    } else {
      setShowNoResults(false);
    }
  }, [searchTerm, filteredProducts]);

  // Uso de componente reutilizable (DRY principle)
  if (loading) return <LoadingGrid count={8} type="product" />;

  if (error) return <div className="alert alert-danger">{error}</div>;

  if (showNoResults) {
    return <div className="alert alert-warning">No se encontraron productos para tu búsqueda.</div>;
  }

  return <ItemList products={filteredProducts} />;
};

export default ItemListContainer; 