import { useCart } from '@/context/CartContext';
import { useAlert } from '@/context/AlertContext';
import Swal from 'sweetalert2';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { showAlert } = useAlert();

  const handleRemoveItem = async () => {
    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      text: `¿Estás seguro de eliminar "${item.name}" del carrito?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      removeFromCart(item.id);
      showAlert(`"${item.name}" eliminado del carrito`, 'info');
    }
  };

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img 
            src={item.image} 
            alt={item.name} 
            width={50} 
            height={50} 
            className="me-3 rounded object-fit-cover"
          />
          <div>
            <h6 className="mb-0">{item.name}</h6>
            <small className="text-muted">{item.description}</small>
          </div>
        </div>
      </td>
      <td>
        <span className="fw-bold">${item.price}</span>
      </td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <button 
            className="btn btn-sm btn-outline-secondary" 
            onClick={() => updateQuantity(item.id, item.quantity - 1, item.stock)} 
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="mx-2 fw-bold">{item.quantity}</span>
          <button 
            className="btn btn-sm btn-outline-secondary" 
            onClick={() => updateQuantity(item.id, item.quantity + 1, item.stock)} 
            disabled={item.quantity >= item.stock}
          >
            +
          </button>
        </div>
        {item.quantity >= item.stock && (
          <small className="text-warning d-block mt-1">
            <i className="bi bi-exclamation-triangle"></i> Stock máximo
          </small>
        )}
      </td>
      <td>
        <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
      </td>
      <td>
        <button 
          className="btn btn-sm btn-danger" 
          onClick={handleRemoveItem}
          title="Eliminar producto"
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default CartItem; 