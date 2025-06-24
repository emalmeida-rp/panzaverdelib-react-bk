import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Datos estáticos de la galería con categorías originales
const galleryItems = [
  {
    id: 1,
    title: "Arte Creativo 1",
    description: "Trabajo artístico realizado con nuestros materiales de arte y papelería.",
    image: "/src/assets/images/galeria-arte1.jpg",
    category: "Arte"
  },
  {
    id: 2,
    title: "Proyecto Escolar",
    description: "Hermoso proyecto escolar utilizando cartulinas y marcadores de colores.",
    image: "/src/assets/images/galeria-arte2.webp",
    category: "Escolar"
  },
  {
    id: 3,
    title: "Arte Expresivo",
    description: "Expresión artística con técnicas mixtas y materiales variados.",
    image: "/src/assets/images/galeria-arte3.webp",
    category: "Arte"
  },
  {
    id: 4,
    title: "Trabajo Manual",
    description: "Creación manual con elementos de librería y arte.",
    image: "/src/assets/images/galeria-arte4.webp",
    category: "Manualidades"
  },
  {
    id: 5,
    title: "Diseño Original",
    description: "Diseño original realizado con nuestros productos de calidad.",
    image: "/src/assets/images/galeria-arte5.webp",
    category: "Diseño"
  },
  {
    id: 6,
    title: "Arte Estudiantil",
    description: "Trabajo estudiantil que demuestra creatividad y técnica.",
    image: "/src/assets/images/galeria-arte6.webp",
    category: "Escolar"
  },
  {
    id: 7,
    title: "Proyecto Creativo",
    description: "Proyecto que combina arte y funcionalidad.",
    image: "/src/assets/images/galeria-arte7.webp",
    category: "Arte"
  },
  {
    id: 8,
    title: "Expresión Artística",
    description: "Una muestra de expresión artística con materiales diversos.",
    image: "/src/assets/images/galeria-arte8.jpeg",
    category: "Arte"
  },
  {
    id: 9,
    title: "Obra Final",
    description: "Obra final que representa el talento de nuestros clientes.",
    image: "/src/assets/images/galeria-arte9.jpeg",
    category: "Diseño"
  }
];

// Categorías originales de galería (más variadas)
const categories = ["Todos", "Arte", "Escolar", "Manualidades", "Diseño"];

const Galeria = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Obtener categoría de URL params
  const categoryParam = searchParams.get('category') || 'Todos';

  useEffect(() => {
    // Inicializar AOS para animaciones
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }, []);

  // Filtrar elementos por categoría
  const filteredItems = categoryParam === 'Todos' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === categoryParam);

  // Manejar cambio de categoría
  const handleCategoryChange = (category) => {
    if (category === 'Todos') {
      // Remover param si es "Todos"
      searchParams.delete('category');
    } else {
      // Agregar/actualizar param
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  // Abrir modal de imagen
  const openImageModal = (item) => {
    setSelectedImage(item);
  };

  // Cerrar modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
        <div className="container">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-success mb-4" data-aos="fade-down">
              Galería de Trabajos
            </h1>
            <p className="lead text-muted mb-4" data-aos="fade-up" data-aos-delay="200">
              Descubre los increíbles trabajos realizados por nuestros clientes con nuestros materiales de calidad. 
              Cada proyecto refleja creatividad, dedicación y la excelencia de nuestros productos.
            </p>
            
            {/* Botones de categoría ORIGINALES */}
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-4" data-aos="fade-up" data-aos-delay="400">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`btn ${categoryParam === category ? 'btn-success' : 'btn-outline-success'} rounded-pill px-4`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de galería */}
          <div className="row g-4">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className="col-lg-4 col-md-6"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="card h-100 border-0 shadow-lg overflow-hidden position-relative gallery-card">
                  {/* Imagen */}
                  <div 
                    className="position-relative overflow-hidden"
                    style={{ height: '280px', cursor: 'pointer' }}
                    onClick={() => openImageModal(item)}
                  >
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-100 h-100 object-fit-cover transition-all"
                      style={{ 
                        transition: 'transform 0.3s ease',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        // Fallback SVG placeholder
                        e.target.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="400" height="280" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="400" height="280" fill="#28a745"/>
                            <text x="200" y="130" font-size="20" font-family="Arial" fill="white" text-anchor="middle">🎨</text>
                            <text x="200" y="160" font-size="14" font-family="Arial" fill="white" text-anchor="middle">${item.title}</text>
                          </svg>
                        `)}`;
                      }}
                    />
                    
                    {/* Overlay al hover */}
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 opacity-0 hover-overlay">
                      <i className="bi bi-zoom-in text-white fs-1"></i>
                    </div>
                  </div>

                  {/* Contenido de la card */}
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0 text-success fw-bold">
                        {item.title}
                      </h5>
                      <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3">
                        {item.category}
                      </span>
                    </div>
                    <p className="card-text text-muted small lh-base">
                      {item.description}
                    </p>
                    
                    <button 
                      className="btn btn-outline-success btn-sm w-100 mt-2"
                      onClick={() => openImageModal(item)}
                    >
                      <i className="bi bi-eye me-2"></i>
                      Ver detalle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje si no hay resultados */}
          {filteredItems.length === 0 && (
            <div className="text-center py-5" data-aos="fade-up">
              <div className="alert alert-info d-inline-block">
                <i className="bi bi-info-circle me-2"></i>
                No hay trabajos en esta categoría todavía.
              </div>
            </div>
          )}

          {/* Call to action */}
          <div className="text-center mt-5 py-4" data-aos="fade-up" data-aos-delay="300">
            <h4 className="text-success mb-3">¿Tienes un proyecto increíble?</h4>
            <p className="text-muted mb-4">
              ¡Comparte tu trabajo realizado con nuestros materiales y podría aparecer en nuestra galería!
            </p>
            <button 
              className="btn btn-success btn-lg rounded-pill px-5"
              onClick={() => navigate('/contact')}
            >
              <i className="bi bi-camera me-2"></i>
              Enviar mi trabajo
            </button>
          </div>
        </div>
      </section>

      {/* Modal para vista ampliada */}
      {selectedImage && (
        <div 
          className="modal d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={closeModal}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0">
              <div className="modal-header border-0 pb-2">
                <h5 className="modal-title text-success fw-bold">
                  {selectedImage.title}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body p-0">
                <img 
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-100"
                  style={{ maxHeight: '70vh', objectFit: 'contain' }}
                />
              </div>
              <div className="modal-footer border-0 pt-2">
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-success rounded-pill">
                      {selectedImage.category}
                    </span>
                  </div>
                  <p className="text-muted mb-0 small">
                    {selectedImage.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estilos adicionales */}
      <style jsx>{`
        .gallery-card:hover .hover-overlay {
          opacity: 1 !important;
        }
        .gallery-card:hover img {
          transform: scale(1.05);
        }
        .transition-all {
          transition: all 0.3s ease;
        }
        .object-fit-cover {
          object-fit: cover;
        }
      `}</style>
    </>
  );
};

export default Galeria; 