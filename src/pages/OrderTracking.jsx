import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderByCode, ORDER_STATES_LABELS } from '@/services/firebase';
import { useAlert } from '@/context/AlertContext';

const OrderTracking = () => {
  const { code: paramCode } = useParams(); // Si viene por URL
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [searchCode, setSearchCode] = useState(paramCode || '');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  // Si viene con código en la URL, buscar automáticamente
  useEffect(() => {
    if (paramCode) {
      handleSearch(paramCode);
    }
  }, [paramCode]);

  const handleSearch = async (codeToSearch = searchCode) => {
    if (!codeToSearch.trim()) {
      showAlert('Ingresa un código de pedido', 'warning');
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const foundOrder = await getOrderByCode(codeToSearch.trim().toUpperCase());
      setOrder(foundOrder);
      if (!foundOrder) {
        setError('Pedido no encontrado. Verifica el código ingresado.');
      }
    } catch (err) {
      console.error('Error buscando pedido:', err);
      setError('Error al buscar el pedido. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const getStatusProgress = (currentStatus) => {
    const statuses = ['pendiente', 'confirmado', 'preparando', 'enviado', 'entregado'];
    const currentIndex = statuses.indexOf(currentStatus);
    return ((currentIndex + 1) / statuses.length) * 100;
  };

  const getStatusColor = (status) => {
    const colors = {
      'pendiente': 'warning',
      'confirmado': 'info',
      'preparando': 'primary',
      'enviado': 'success',
      'entregado': 'success',
      'cancelado': 'danger'
    };
    return colors[status] || 'secondary';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-success mb-3">
              <i className="bi bi-search me-2"></i>
              Seguimiento de Pedidos
            </h1>
            <p className="lead text-muted">
              Consulta el estado de tu pedido ingresando el código que recibiste
            </p>
          </div>

          {/* Formulario de búsqueda */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 align-items-end">
                  <div className="col-md-8">
                    <label htmlFor="orderCode" className="form-label fw-bold">
                      Código de pedido
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="orderCode"
                      value={searchCode}
                      onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                      placeholder="Ej: PV-1234567890-ABCD"
                      disabled={loading}
                    />
                    <div className="form-text">
                      El código lo recibiste al confirmar tu pedido
                    </div>
                  </div>
                  <div className="col-md-4">
                    <button
                      type="submit"
                      className="btn btn-success w-100"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Buscando...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-search me-2"></i>
                          Buscar pedido
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Resultado de la búsqueda */}
          {searched && (
            <>
              {error && (
                <div className="alert alert-warning" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              {order && (
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-success text-white">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="mb-0">
                        <i className="bi bi-receipt me-2"></i>
                        Pedido {order.code}
                      </h4>
                      <span className={`badge bg-${getStatusColor(order.status)} fs-6`}>
                        {ORDER_STATES_LABELS[order.status]}
                      </span>
                    </div>
                  </div>

                  <div className="card-body">
                    {/* Progress bar de estado */}
                    {order.status !== 'cancelado' && (
                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small className="fw-bold">Progreso del pedido</small>
                          <small className="text-muted">{Math.round(getStatusProgress(order.status))}%</small>
                        </div>
                        <div className="progress" style={{ height: '8px' }}>
                          <div
                            className="progress-bar bg-success"
                            style={{ width: `${getStatusProgress(order.status)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Información del cliente */}
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <h6 className="fw-bold text-success mb-2">
                          <i className="bi bi-person me-1"></i>
                          Información del cliente
                        </h6>
                        <p className="mb-1"><strong>Nombre:</strong> {order.userName}</p>
                        <p className="mb-1"><strong>Email:</strong> {order.userEmail}</p>
                        <p className="mb-1"><strong>Teléfono:</strong> {order.userPhone}</p>
                        <p className="mb-0"><strong>Dirección:</strong> {order.userAddress}</p>
                      </div>
                      <div className="col-md-6">
                        <h6 className="fw-bold text-success mb-2">
                          <i className="bi bi-calendar me-1"></i>
                          Detalles del pedido
                        </h6>
                        <p className="mb-1"><strong>Fecha:</strong> {formatDate(order.createdAt)}</p>
                        <p className="mb-1"><strong>Total:</strong> {formatCurrency(order.total)}</p>
                        <p className="mb-1"><strong>Estado:</strong> {ORDER_STATES_LABELS[order.status]}</p>
                        {order.comments && (
                          <p className="mb-0"><strong>Comentarios:</strong> {order.comments}</p>
                        )}
                      </div>
                    </div>

                    {/* Items del pedido */}
                    <div className="mb-4">
                      <h6 className="fw-bold text-success mb-3">
                        <i className="bi bi-bag me-1"></i>
                        Productos pedidos
                      </h6>
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead className="table-light">
                            <tr>
                              <th>Producto</th>
                              <th>Cantidad</th>
                              <th>Precio</th>
                              <th>Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items?.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  {item.productName || item.product}
                                  {!item.productName && (
                                    <small className="text-muted d-block">ID: {item.product}</small>
                                  )}
                                </td>
                                <td>{item.quantity}</td>
                                <td>{formatCurrency(item.price)}</td>
                                <td>{formatCurrency(item.price * item.quantity)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="table-success">
                              <th colSpan="3">Total</th>
                              <th>{formatCurrency(order.total)}</th>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    {/* Historial de estados */}
                    {order.statusHistory && order.statusHistory.length > 0 && (
                      <div>
                        <h6 className="fw-bold text-success mb-3">
                          <i className="bi bi-clock-history me-1"></i>
                          Historial de estados
                        </h6>
                        <div className="timeline">
                          {order.statusHistory.map((entry, index) => (
                            <div key={index} className="d-flex mb-3">
                              <div className="flex-shrink-0">
                                <span className={`badge bg-${getStatusColor(entry.status)} rounded-pill`}>
                                  {index + 1}
                                </span>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h6 className="mb-1">{ORDER_STATES_LABELS[entry.status]}</h6>
                                <p className="mb-1 text-muted small">{entry.comment}</p>
                                <small className="text-muted">{formatDate(entry.date)}</small>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="card-footer bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        <i className="bi bi-info-circle me-1"></i>
                        ¿Necesitas ayuda? Contactanos con el código de tu pedido
                      </small>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => navigate('/contact')}
                      >
                        <i className="bi bi-headset me-1"></i>
                        Contactar soporte
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Información adicional */}
          {!searched && (
            <div className="card border-0 bg-light">
              <div className="card-body text-center">
                <i className="bi bi-info-circle display-6 text-muted mb-3"></i>
                <h5 className="text-muted">¿Cómo funciona el seguimiento?</h5>
                <p className="text-muted mb-3">
                  Ingresa el código de pedido que recibiste al confirmar tu compra.
                  Podrás ver el estado actual y el historial completo de tu pedido.
                </p>
                <div className="row text-start">
                  <div className="col-md-6">
                    <h6 className="text-success">Estados del pedido:</h6>
                    <ul className="list-unstyled">
                      <li><span className="badge bg-warning text-dark me-2">⏳</span>Pendiente</li>
                      <li><span className="badge bg-info me-2">✅</span>Confirmado</li>
                      <li><span className="badge bg-primary me-2">📦</span>Preparando</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-success">Estados finales:</h6>
                    <ul className="list-unstyled">
                      <li><span className="badge bg-success me-2">🚚</span>Enviado</li>
                      <li><span className="badge bg-success me-2">🎉</span>Entregado</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking; 