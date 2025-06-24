import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAlert } from '@/context/AlertContext';
import '../assets/styles/pages/contact.scss';

const Contact = () => {
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'consulta',
    message: '',
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Inicializar AOS para animaciones
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envío (puedes integrar con un servicio real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showAlert(`¡Gracias ${formData.name}! Tu mensaje ha sido enviado correctamente. Te responderemos pronto.`, 'success');
      
      // Resetear formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'consulta',
        message: '',
        newsletter: false
      });
    } catch (error) {
      showAlert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact contact-page-wrapper">
      {/* Header */}
      <header className="text-center py-5 bg-light">
        <div className="container">
          <h1 className="display-4 fw-bold text-success mb-4" data-aos="fade-down">
            Contáctanos
          </h1>
          <p className="lead text-muted" data-aos="fade-up" data-aos-delay="200">
            Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos a la brevedad.
          </p>
        </div>
      </header>

      <div className="container py-5">
        <div className="row">
          {/* Información de Contacto */}
          <div className="col-lg-4 mb-5">
            <div data-aos="fade-right">
              <h3 className="text-success mb-4">
                <i className="bi bi-geo-alt-fill me-2"></i>
                Información de Contacto
              </h3>
              
              <div className="letrero mb-4">
                <p className="texto-letrero">
                  📍 <strong>Nuestra Ubicación:</strong><br/>
                  Estamos ubicados en el centro de la ciudad<br/>
                  para brindarte la mejor atención personalizada
                </p>
              </div>

              <div className="contact-info">
                <div className="mb-4 p-3 border rounded">
                  <h5 className="text-success mb-3">
                    <i className="bi bi-clock-fill me-2"></i>
                    Horarios de Atención
                  </h5>
                  <p className="mb-1"><strong>Lunes a Viernes:</strong> 9:00 - 18:00 hs</p>
                  <p className="mb-1"><strong>Sábados:</strong> 9:00 - 13:00 hs</p>
                  <p className="mb-0"><strong>Domingos:</strong> Cerrado</p>
                </div>

                <div className="mb-4 p-3 border rounded">
                  <h5 className="text-success mb-3">
                    <i className="bi bi-telephone-fill me-2"></i>
                    Contacto Directo
                  </h5>
                  <p className="mb-1">
                    <i className="bi bi-envelope me-2"></i>
                    <span className="text-muted">Consultá por el formulario de contacto</span>
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-phone me-2"></i>
                    <span className="text-muted">Consultá por nuestros canales</span>
                  </p>
                  <p className="mb-0">
                    <i className="bi bi-whatsapp me-2"></i>
                    <span className="text-muted">WhatsApp disponible</span>
                  </p>
                </div>

                <div className="p-3 border rounded">
                  <h5 className="text-success mb-3">
                    <i className="bi bi-share-fill me-2"></i>
                    Síguenos
                  </h5>
                  <div className="d-flex gap-3">
                    <button className="btn btn-outline-secondary btn-sm rounded-pill" disabled title="Próximamente">
                      <i className="bi bi-facebook"></i>
                    </button>
                    <button className="btn btn-outline-secondary btn-sm rounded-pill" disabled title="Próximamente">
                      <i className="bi bi-instagram"></i>
                    </button>
                    <button className="btn btn-outline-secondary btn-sm rounded-pill" disabled title="Próximamente">
                      <i className="bi bi-whatsapp"></i>
                    </button>
                  </div>
                  <small className="text-muted d-block mt-2 fw-bold">Próximamente en redes sociales</small>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="col-lg-8">
            <div data-aos="fade-left" data-aos-delay="200">
              <h3 className="text-success mb-4">
                <i className="bi bi-envelope-fill me-2"></i>
                Envíanos un Mensaje
              </h3>
              
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre Completo <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="subject" className="form-label">
                      Asunto
                    </label>
                    <select
                      className="form-select"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    >
                      <option value="consulta">Consulta General</option>
                      <option value="pedido">Realizar Pedido</option>
                      <option value="presupuesto">Solicitar Presupuesto</option>
                      <option value="reclamo">Reclamo</option>
                      <option value="sugerencia">Sugerencia</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Mensaje <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <label className="form-check-label" htmlFor="newsletter">
                      Quiero recibir noticias y ofertas especiales por correo electrónico
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send-fill me-2"></i>
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div data-aos="fade-up" data-aos-delay="400">
              <h3 className="text-success text-center mb-4">
                <i className="bi bi-question-circle-fill me-2"></i>
                Preguntas Frecuentes
              </h3>
              
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      ¿Cuáles son los medios de pago disponibles?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Aceptamos efectivo, tarjetas de débito y crédito, transferencias bancarias y MercadoPago. También ofrecemos facilidades de pago para compras mayores.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      ¿Hacen entregas a domicilio?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Sí, realizamos entregas en la zona céntrica sin costo adicional para compras de cierto monto. Para otras zonas, consultanos el costo de envío.
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      ¿Tienen descuentos para instituciones educativas?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Sí, ofrecemos descuentos especiales para escuelas, colegios y universidades. Contactanos para conocer nuestras tarifas preferenciales.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
);
};

export default Contact; 