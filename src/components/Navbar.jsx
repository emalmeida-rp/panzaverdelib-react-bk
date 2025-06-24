import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const categories = [
  { id: 'libreria', name: 'Librería' },
  { id: 'escolar', name: 'Escolar' }
];

const Navbar = () => {
  const { getCartCount } = useCart();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleCategoryClick = (path) => {
    setIsNavCollapsed(true);
    setShowDropdown(false);
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
            <div className="nav-item dropdown" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
              <button type="button" className="nav-link dropdown-toggle btn btn-link" style={{textDecoration: 'none'}} aria-expanded={showDropdown} onClick={() => setIsNavCollapsed(true)}>
                Productos
              </button>
              <ul className={`dropdown-menu${showDropdown ? ' show' : ''}`} style={{ minWidth: 180 }}>
                <li>
                  <button className="dropdown-item" onClick={() => handleCategoryClick('/productos')}>
                    Todos
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button className="dropdown-item" onClick={() => handleCategoryClick(`/category/${cat.id}`)}>
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/history" className="nav-link" onClick={() => setIsNavCollapsed(true)}>
              Historia
            </Link>
            <Link to="/gallery" className="nav-link" onClick={() => setIsNavCollapsed(true)}>
              Galería
            </Link>
            <Link to="/contact" className="nav-link" onClick={() => setIsNavCollapsed(true)}>
              Contacto
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