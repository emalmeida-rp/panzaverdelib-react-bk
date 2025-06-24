// Componente reutilizable para placeholders de carga (DRY principle)
// Elimina duplicación entre ItemListContainer, Galeria, AdminDashboard, etc.

/**
 * Grid de placeholders de carga genérico y reutilizable
 * @param {number} count - Número de placeholders a mostrar
 * @param {string} type - Tipo de placeholder ('product', 'gallery', 'table')
 * @param {object} customStyles - Estilos personalizados opcionales
 */
const LoadingGrid = ({ count = 8, type = 'product', customStyles = {} }) => {
  const placeholders = Array.from({ length: count }, (_, idx) => idx);

  // Placeholder para productos
  if (type === 'product') {
    return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {placeholders.map((idx) => (
          <div className="col" key={idx}>
            <div className="card h-100 bg-light card-products placeholder-glow">
              <div 
                className="card-img-top img-market placeholder" 
                style={{ 
                  height: 180, 
                  background: '#e0e0e0', 
                  borderRadius: 12,
                  ...customStyles.image 
                }}
              />
              <div className="card-header text-center">
                <h3 
                  className="h5 mb-0 placeholder col-8" 
                  style={{ 
                    height: 24, 
                    background: '#d0d0d0', 
                    borderRadius: 6,
                    ...customStyles.title 
                  }}
                />
              </div>
              <div className="card-body text-center">
                <h4 
                  className="card-text placeholder col-6" 
                  style={{ 
                    height: 20, 
                    background: '#e0e0e0', 
                    borderRadius: 6,
                    ...customStyles.price 
                  }}
                />
                <p 
                  className="card-text placeholder col-10" 
                  style={{ 
                    height: 16, 
                    background: '#f0f0f0', 
                    borderRadius: 6,
                    ...customStyles.description 
                  }}
                />
                <button 
                  className="btn btn-secondary w-100 disabled placeholder col-8" 
                  style={{ 
                    height: 38, 
                    background: '#d0d0d0', 
                    borderRadius: 8,
                    ...customStyles.button 
                  }} 
                  disabled
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Placeholder para galería
  if (type === 'gallery') {
    return (
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {placeholders.map((idx) => (
          <div className="col" key={idx}>
            <div className="card h-100 shadow-sm border-0 placeholder-glow">
              <div 
                className="card-img-top placeholder" 
                style={{ 
                  height: 220, 
                  background: '#e0e0e0', 
                  borderRadius: 8,
                  ...customStyles.image 
                }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 
                  className="card-title text-center mb-2 placeholder col-8" 
                  style={{ 
                    height: 24, 
                    background: '#d0d0d0', 
                    borderRadius: 6, 
                    margin: '0 auto',
                    ...customStyles.title 
                  }}
                />
                <p 
                  className="card-text placeholder col-10" 
                  style={{ 
                    height: 16, 
                    background: '#f0f0f0', 
                    borderRadius: 6, 
                    margin: '0 auto',
                    ...customStyles.description 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Placeholder para tabla
  if (type === 'table') {
    return (
      <tbody>
        {placeholders.map((idx) => (
          <tr key={idx} className="placeholder-glow">
            {Array.from({ length: customStyles.columns || 7 }).map((_, cidx) => (
              <td key={cidx}>
                <span 
                  className="placeholder col-10" 
                  style={{ 
                    height: 18, 
                    display: 'inline-block', 
                    borderRadius: 4,
                    ...customStyles.cell 
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  // Fallback genérico
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
};

export default LoadingGrid; 