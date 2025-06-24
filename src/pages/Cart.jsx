import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';

const Cart = () => {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <i className="bi bi-cart-x display-1 text-muted"></i>
          <h2 className="mt-3">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">¡Agrega algunos productos para comenzar tu compra!</p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/productos')}
          >
            <i className="bi bi-shop me-2"></i>
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
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="mb-0">
                <i className="bi bi-cart me-2"></i>
                Carrito de compras
              </h3>
              <span className="badge bg-primary fs-6">
                {cart.reduce((total, item) => total + item.quantity, 0)} productos
              </span>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resumen del carrito */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-receipt me-2"></i>
                Resumen del pedido
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span className="text-success">Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold fs-5">Total:</span>
                <span className="fw-bold fs-4 text-success">${getTotal().toFixed(2)}</span>
              </div>
              
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-success btn-lg"
                  onClick={() => navigate('/checkout')}
                >
                  <i className="bi bi-credit-card me-2"></i>
                  Proceder al checkout
                </button>
                
                <button 
                  className="btn btn-outline-danger"
                  onClick={clearCart}
                >
                  <i className="bi bi-trash me-2"></i>
                  Vaciar carrito
                </button>
                
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/productos')}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Seguir comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 