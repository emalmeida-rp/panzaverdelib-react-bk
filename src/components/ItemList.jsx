import Item from './Item';

const ItemList = ({ products }) => {
  return (
    <div className="row g-4">
      {products.map((product) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
          <Item product={product} />
        </div>
      ))}
    </div>
  );
};

export default ItemList; 