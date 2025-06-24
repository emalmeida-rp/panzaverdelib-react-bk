import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAlert } from '@/context/AlertContext';
import { createOrder } from '@/services/firebase';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
  const { cart, getTotal, clearCart } = useCart();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userAddress: '',
    comments: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error específico cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.userName.trim()) {
      newErrors.userName = 'El nombre es obligatorio';
    }
    
    if (!formData.userEmail.trim()) {
      newErrors.userEmail = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
      newErrors.userEmail = 'El formato del email no es válido';
    }
    
    if (!formData.userPhone.trim()) {
      newErrors.userPhone = 'El teléfono es obligatorio';
    } else if (!/^\+?[\d\s\-\(\)]{8,}$/.test(formData.userPhone)) {
      newErrors.userPhone = 'El formato del teléfono no es válido';
    }
    
    if (!formData.userAddress.trim()) {
      newErrors.userAddress = 'La dirección es obligatoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showAlert('Por favor corrige los errores en el formulario', 'danger');
      return;
    }
    
    if (cart.length === 0) {
      showAlert('El carrito está vacío', 'warning');
      return;
    }

    setLoading(true);
    
    try {
      const orderData = {
        ...formData,
        items: cart.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: getTotal()
      };
      
      // Crear orden en Firestore
      const order = await createOrder(orderData);
      
      // Limpiar carrito
      clearCart();
      
      // Mostrar confirmación elegante
      await Swal.fire({
        icon: 'success',
        title: '¡Pedido confirmado!',
        html: `
          <p>Tu pedido ha sido registrado exitosamente.</p>
          <p><strong>Código de pedido:</strong> ${order.code}</p>
          <p>Recibirás una confirmación por email.</p>
        `,
        confirmButtonText: 'Ver confirmación',
        confirmButtonColor: '#28a745'
      });
      
      // Redirigir a confirmación con el código de la orden
      navigate(`/order-confirmation/${order.code}`);
      
    } catch (error) {
      console.error('Error al crear la orden:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error al procesar el pedido',
        text: error.message || 'Ocurrió un error inesperado',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning text-center">
          <h4>Tu carrito está vacío</h4>
          <p>Agrega algunos productos antes de proceder al checkout.</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/productos')}
          >
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">
                <i className="bi bi-clipboard-check me-2"></i>
                Información de entrega
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="userName" className="form-label">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
                      id="userName"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      placeholder="Ingresa tu nombre completo"
                    />
                    {errors.userName && (
                      <div className="invalid-feedback">{errors.userName}</div>
                    )}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="userEmail" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.userEmail ? 'is-invalid' : ''}`}
                      id="userEmail"
                      name="userEmail"
                      value={formData.userEmail}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                    />
                    {errors.userEmail && (
                      <div className="invalid-feedback">{errors.userEmail}</div>
                    )}
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="userPhone" className="form-label">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${errors.userPhone ? 'is-invalid' : ''}`}
                      id="userPhone"
                      name="userPhone"
                      value={formData.userPhone}
                      onChange={handleChange}
                      placeholder="+54 9 11 1234-5678"
                    />
                    {errors.userPhone && (
                      <div className="invalid-feedback">{errors.userPhone}</div>
                    )}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="userAddress" className="form-label">
                      Dirección de entrega *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.userAddress ? 'is-invalid' : ''}`}
                      id="userAddress"
                      name="userAddress"
                      value={formData.userAddress}
                      onChange={handleChange}
                      placeholder="Calle, número, ciudad"
                    />
                    {errors.userAddress && (
                      <div className="invalid-feedback">{errors.userAddress}</div>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="comments" className="form-label">
                    <i className="bi bi-chat-left-text me-1"></i>
                    Comentarios adicionales
                  </label>
                  <textarea
                    className="form-control"
                    id="comments"
                    name="comments"
                    rows="3"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Instrucciones especiales para la entrega..."
                  ></textarea>
                  <div className="form-text">
                    Ejemplo: "Entregar después de las 18hs" o "Llamar antes de entregar"
                  </div>
                </div>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-md-2"
                    onClick={() => navigate('/cart')}
                  >
                    <i className="bi bi-arrow-left me-1"></i>
                    Volver al carrito
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading || cart.length === 0}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-1"></i>
                        Confirmar pedido
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Resumen del pedido */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-receipt me-2"></i>
                Resumen del pedido
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                {cart.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        width={40} 
                        height={40} 
                        className="me-2 rounded object-fit-cover"
                      />
                      <div>
                        <div className="fw-bold small">{item.name}</div>
                        <small className="text-muted">x{item.quantity}</small>
                      </div>
                    </div>
                    <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold">Total:</span>
                <span className="fw-bold fs-5 text-success">${getTotal().toFixed(2)}</span>
              </div>
              
              <div className="text-center">
                <small className="text-muted">
                  <i className="bi bi-shield-check me-1"></i>
                  Compra segura con Firebase
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm; 