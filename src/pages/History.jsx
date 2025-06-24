import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';
import '../assets/styles/pages/history.scss';

const historicalFigures = [
  {
    name: 'Manuel Belgrano',
    image: '/img/historia-belgrano.webp',
    description: 'Abogado, economista, periodista, político, diplomático y militar argentino. Fue uno de los principales patriotas que impulsó la Revolución de Mayo y la independencia de las Provincias Unidas del Río de la Plata. Creador de la bandera argentina y gran impulsor de la educación.',
    link: 'https://es.wikipedia.org/wiki/Manuel_Belgrano'
  },
  {
    name: 'José de San Martín',
    image: '/img/historia-sanmartin.webp',
    description: 'Militar y político argentino, libertador de Argentina, Chile y Perú. Es considerado uno de los libertadores más importantes de Sudamérica y un símbolo de la independencia.',
    link: 'https://es.wikipedia.org/wiki/Jos%C3%A9_de_San_Mart%C3%ADn'
  },
  {
    name: 'Mariano Moreno',
    image: '/img/historia-mmoreno.webp',
    description: 'Abogado, periodista y político de las Provincias Unidas del Río de la Plata. Fue uno de los ideólogos de la Revolución de Mayo y defensor de la libertad de prensa y la educación.',
    link: 'https://es.wikipedia.org/wiki/Mariano_Moreno'
  },
  {
    name: 'Juan Bautista Alberdi',
    image: '/img/historia-alberdi.webp',
    description: 'Jurista, economista, político, escritor y músico argentino. Autor intelectual de la Constitución Argentina de 1853 y gran defensor de la organización nacional.',
    link: 'https://es.wikipedia.org/wiki/Juan_Bautista_Alberdi'
  },
  {
    name: 'Domingo Faustino Sarmiento',
    image: '/img/historia-sarmiento.webp',
    description: 'Político, escritor, docente, periodista y militar argentino. Presidente de la Nación Argentina entre 1868 y 1874. Impulsor de la educación pública y la modernización del país.',
    link: 'https://es.wikipedia.org/wiki/Domingo_Faustino_Sarmiento'
  },
  {
    name: 'Julio Argentino Roca',
    image: '/img/historia-roca.webp',
    description: 'Militar y político argentino, presidente de la Nación Argentina en dos oportunidades. Protagonista de la consolidación territorial y la modernización del Estado.',
    link: 'https://es.wikipedia.org/wiki/Julio_Argentino_Roca'
  },
  {
    name: 'Facundo Quiroga',
    image: '/img/historia-quiroga.webp',
    description: 'Caudillo y militar argentino, uno de los principales líderes federales durante las guerras civiles argentinas. Defensor de la autonomía provincial y la justicia social.',
    link: 'https://es.wikipedia.org/wiki/Facundo_Quiroga'
  },
  {
    name: 'Martín Miguel de Güemes',
    image: '/img/historia-mguemes.webp',
    description: 'Militar y político argentino que cumplió una destacada actuación en la Guerra de la Independencia Argentina. Líder de la resistencia en el norte y símbolo de la lucha popular.',
    link: 'https://es.wikipedia.org/wiki/Mart%C3%ADn_Miguel_de_G%C3%BCemes'
  },
  {
    name: 'Nuestra Historia',
    image: '/img/historia-panzaverde.webp',
    description: `En Librería Panza Verde, sabemos que el regreso a clases y el trabajo diario pueden ser un desafío económico. Por eso, hemos creado un espacio donde encontrarás todo lo que necesitas para equipar tu escuela u oficina, con la mejor atención personalizada y precios accesibles.

Somos más que una tienda de insumos. Somos un equipo de personas comprometidas con brindarte un servicio ágil y de calidad. Entendemos tus necesidades y te ofrecemos soluciones prácticas y eficientes.

En esta tienda encontrarás una amplia variedad de artículos escolares y de oficina, desde lápices y cuadernos hasta resmas de papel y equipos de impresión. Trabajamos con las mejores marcas y te ofrecemos productos de calidad que te ayudarán a alcanzar tus metas.

Pero lo más importante es que aquí te sentirás como en casa. Te recibiremos con una sonrisa y te brindaremos la atención que te mereces. Queremos ser tu aliado en este camino y ayudarte a ahorrar tiempo y dinero.

¡Visítanos y descubre la diferencia de comprar en Librería Panza Verde!`,
    link: '#'
  }
];

const History = () => {
  useEffect(() => {
    // Inicializar AOS para animaciones al hacer scroll
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <div className="history">
      {/* Header con introducción */}
      <header className="text-center py-5 bg-light">
        <div className="container">
          <h1 className="display-4 fw-bold text-success mb-4" data-aos="fade-down">
            Historia de Argentina y Nuestra Librería
          </h1>
          <p className="lead text-muted" data-aos="fade-up" data-aos-delay="200">
            Descubre la historia de grandes personalidades argentinas y conoce nuestra trayectoria 
            como librería comprometida con la educación y el arte.
          </p>
        </div>
      </header>

      {/* Timeline de próceres */}
      <div className="timeline-container">
        <div className="container">
          <div className="timeline-list">
            {historicalFigures.map((figure, index) => {
              // Especial tratamiento para "Nuestra Historia" (última tarjeta)
              if (figure.name === 'Nuestra Historia') {
                return (
                  <div 
                    key={index}
                    className="timeline-item d-flex justify-content-center"
                    data-aos="fade-up"
                    data-aos-delay="800"
                    style={{ marginTop: '4rem' }}
                  >
                    <div className="col-md-10 col-lg-8">
                      <div className="timeline-card card-historia-panzaverde text-center">
                        {/* Imagen centrada */}
                        <div className="text-center mb-4">
                          <img 
                            src={figure.image} 
                            alt={figure.name}
                            className="timeline-img img-fluid rounded-circle mx-auto"
                            style={{ 
                              width: '200px', 
                              height: '200px',
                              objectFit: 'cover',
                              border: '4px solid #28a745',
                              boxShadow: '0 4px 16px rgba(40,167,69,0.2)'
                            }}
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMjhhNzQ1IiByeD0iMTAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTA1IiBmb250LXNpemU9IjIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn4+qPC90ZXh0Pgo8L3N2Zz4K';
                            }}
                          />
                        </div>

                        <h3 className="card-title text-success mb-4" style={{ fontSize: '2rem' }}>
                          {figure.name}
                        </h3>
                        <p className="card-text text-muted mb-4 lh-lg" style={{ fontSize: '1.1rem' }}>
                          {figure.description}
                        </p>
                        
                        {/* Valores destacados */}
                        <div className="row mt-4">
                          <div className="col-md-6 mb-3">
                            <div className="d-flex align-items-center justify-content-center">
                              <i className="bi bi-heart-fill text-success me-2 fs-4"></i>
                              <span className="fw-bold">Atención Personalizada</span>
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="d-flex align-items-center justify-content-center">
                              <i className="bi bi-star-fill text-success me-2 fs-4"></i>
                              <span className="fw-bold">Calidad Garantizada</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Tarjetas normales de próceres
              return (
                <div 
                  key={index}
                  className={`timeline-item d-flex align-items-center ${index % 2 === 0 ? 'flex-md-row' : 'flex-md-row-reverse'}`}
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-delay={index * 100}
                >
                  {/* Imagen */}
                  <div className="col-md-5 text-center mb-3 mb-md-0">
                    <img 
                      src={figure.image} 
                      alt={figure.name}
                      className="timeline-img img-fluid rounded-circle"
                      style={{ 
                        width: '180px', 
                        height: '180px',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE4MCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiBmaWxsPSIjNDI4MGIzIiByeD0iOTAiLz4KPGC4eXQgeD0iOTAiIHk9Ijk1IiBmb250LXNpemU9IjE2IiBmb250LWZhbWlseT0iQXJpYWwiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5OQPC90ZXh0Pgo8L3N2Zz4K';
                      }}
                    />
                  </div>

                  {/* Contenido */}
                  <div className="col-md-7">
                    <div className="timeline-card">
                      <h3 className="card-title text-success">
                        {figure.name}
                      </h3>
                      <p className="card-text text-muted mb-3">
                        {figure.description}
                      </p>
                      {figure.link !== '#' && (
                        <a 
                          href={figure.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-outline-success btn-sm"
                        >
                          <i className="bi bi-arrow-up-right-square me-2"></i>
                          Leer más
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History; 