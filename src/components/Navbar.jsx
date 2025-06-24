import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const categories = [
  { id: 'libreria', name: 'Librería' },
  { id: 'escolar', name: 'Escolar' }
];

// Categorías de galería (originales)
const galleryCategories = ["Arte", "Escolar", "Manualidades", "Diseño"];

const Navbar = () => {
  const { getCartCount } = useCart();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showGalleryDropdown, setShowGalleryDropdown] = useState(false);
  const navigate = useNavigate();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleCategoryClick = (path) => {
    setIsNavCollapsed(true);
    setShowProductsDropdown(false);
    setShowGalleryDropdown(false);
    navigate(path);
  };

  return (
    <nav className="navbar z-index-100 navbar-expand-lg navbar-light bg-success w-100 position-sticky top-0">
      <div className="container-fluid px-4 justify-content-between">
        <Link to="/" className="navbar-logo" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>
          Libreria Panza Verde
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavCollapse}
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
          <div className="navbar-nav ms-auto">
            <Link to="/" className="nav-link" onClick={() => setIsNavCollapsed(true)}>
              Inicio
            </Link>
            
            {/* Dropdown Productos */}
            <div className="nav-item dropdown" onMouseEnter={() => setShowProductsDropdown(true)} onMouseLeave={() => setShowProductsDropdown(false)}>
              <button type="button" className="nav-link dropdown-toggle btn btn-link" style={{textDecoration: 'none'}} aria-expanded={showProductsDropdown}>
                Productos
              </button>
              <ul className={`dropdown-menu${showProductsDropdown ? ' show' : ''}`} style={{ minWidth: 180 }}>
                <li>
                  <button className="dropdown-item" onClick={() => handleCategoryClick('/products')}>
                    <i className="bi bi-grid-3x3-gap me-2"></i>
                    Todos
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button className="dropdown-item" onClick={() => handleCategoryClick(`/category/${cat.id}`)}>
                      <i className={`bi ${cat.id === 'libreria' ? 'bi-book' : 'bi-pencil'} me-2`}></i>
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/history" className="nav-link" onClick={() => setIsNavCollapsed(true)}>
              Historia
            </Link>
            
            {/* Dropdown Galería - CON CATEGORÍAS ORIGINALES */}
            <div className="nav-item dropdown" onMouseEnter={() => setShowGalleryDropdown(true)} onMouseLeave={() => setShowGalleryDropdown(false)}>
              <button type="button" className="nav-link dropdown-toggle btn btn-link" style={{textDecoration: 'none'}} aria-expanded={showGalleryDropdown}>
                Galería
              </button>
              <ul className={`dropdown-menu${showGalleryDropdown ? ' show' : ''}`} style={{ minWidth: 200 }}>
                <li>
                  <button className="dropdown-item" onClick={() => handleCategoryClick('/gallery')}>
                    <i className="bi bi-images me-2"></i>
                    Todos los trabajos
                  </button>
                </li>
                {galleryCategories.map(category => (
                  <li key={category}>
                    <button className="dropdown-item" onClick={() => handleCategoryClick(`/gallery?category=${category}`)}>
                      <i className={`bi ${
                        category === 'Arte' ? 'bi-palette' : 
                        category === 'Escolar' ? 'bi-pencil' :
                        category === 'Manualidades' ? 'bi-scissors' :
                        'bi-vector-pen'
                      } me-2`}></i>
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <Link to="/contact" className="nav-link" onClick={() => setIsNavCollapsed(true)}>
              Contacto
            </Link>
            <Link to="/tracking" className="nav-link" onClick={() => setIsNavCollapsed(true)}>
              <i className="bi bi-search me-1"></i>
              Seguimiento
            </Link>
            <Link to="/cart" className="nav-link position-relative" onClick={() => setIsNavCollapsed(true)}>
              <i className="bi bi-cart"></i>
              {getCartCount() > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 