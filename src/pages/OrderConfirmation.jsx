import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderByCode } from '../services/firebase';

const OrderConfirmation = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderByCode(code);
        if (data) {
          setOrder(data);
        } else {
          setError('Pedido no encontrado');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Error al cargar el pedido');
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchOrder();
    } else {
      setError('Código de pedido no válido');
      setLoading(false);
    }
  }, [code]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p>Cargando información del pedido...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center">
          <i className="bi bi-exclamation-triangle display-4 d-block mb-3"></i>
          <h4>{error}</h4>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning text-center">
          <h4>No se encontró el pedido</h4>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-success text-white text-center">
              <i className="bi bi-check-circle display-4 d-block mb-2"></i>
              <h2 className="mb-0">¡Pedido Confirmado!</h2>
            </div>
            <div className="card-body">
              {/* Código del pedido */}
              <div className="alert alert-info text-center mb-4">
                <h5 className="mb-2">Tu código de pedido es:</h5>
                <h3 className="fw-bold text-primary">{order.code}</h3>
                <small>Guarda este código para hacer seguimiento de tu pedido</small>
              </div>

              <div className="row">
                {/* Información del cliente */}
                <div className="col-md-6 mb-4">
                  <h5>
                    <i className="bi bi-person me-2"></i>
                    Información de entrega
                  </h5>
                  <hr />
                  <p><strong>Nombre:</strong> {order.userName}</p>
                  <p><strong>Email:</strong> {order.userEmail}</p>
                  <p><strong>Teléfono:</strong> {order.userPhone}</p>
                  <p><strong>Dirección:</strong> {order.userAddress}</p>
                  {order.comments && (
                    <div>
                      <strong>Comentarios:</strong>
                      <div className="alert alert-light mt-2 mb-0">
                        {order.comments}
                      </div>
                    </div>
                  )}
                </div>

                {/* Resumen del pedido */}
                <div className="col-md-6 mb-4">
                  <h5>
                    <i className="bi bi-receipt me-2"></i>
                    Resumen del pedido
                  </h5>
                  <hr />
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <tbody>
                        {order.items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.quantity}x</td>
                            <td>{item.product?.name || 'Producto'}</td>
                            <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="table-success">
                          <td colSpan="2" className="fw-bold">Total:</td>
                          <td className="text-end fw-bold fs-5">${order.total?.toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="alert alert-light">
                <h6><i className="bi bi-info-circle me-2"></i>Próximos pasos:</h6>
                <ul className="mb-0">
                  <li>Te contactaremos pronto para coordinar la entrega</li>
                  <li>Recibirás un email con los detalles del pedido</li>
                  <li>Puedes usar el código <strong>{order.code}</strong> para hacer seguimiento</li>
                </ul>
              </div>

              {/* Información de pago */}
              <div className="alert alert-info">
                <h6><i className="bi bi-credit-card me-2"></i>Información de pago:</h6>
                <p className="mb-2">
                  <strong>Alias Mercado Pago:</strong> Panzaverde.lib
                </p>
                <p className="mb-0">
                  También puedes aguardar a que te contactemos para coordinar el pago y la entrega.
                </p>
              </div>

              {/* Botones de acción */}
              <div className="text-center mt-4">
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button 
                    className="btn btn-success me-md-2"
                    onClick={() => navigate('/productos')}
                  >
                    <i className="bi bi-shop me-2"></i>
                    Seguir comprando
                  </button>
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => navigate('/')}
                  >
                    <i className="bi bi-house me-2"></i>
                    Volver al inicio
                  </button>
                </div>
              </div>
            </div>
            <div className="card-footer text-center text-muted">
              <small>
                <i className="bi bi-heart-fill text-danger me-1"></i>
                ¡Gracias por confiar en Librería Panza Verde!
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 