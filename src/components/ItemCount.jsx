import { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleIncrement = () => {
    if (count < stock) setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleAdd = () => {
    onAdd(count);
  };

  return (
    <div className="d-flex flex-column align-items-start gap-2">
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-secondary" onClick={handleDecrement} disabled={count <= 1}>-</button>
        <span>{count}</span>
        <button className="btn btn-secondary" onClick={handleIncrement} disabled={count >= stock}>+</button>
      </div>
      <button className="btn btn-primary" onClick={handleAdd} disabled={stock === 0}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount; 