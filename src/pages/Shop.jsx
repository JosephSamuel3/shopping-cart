
import ProductCards from '../components/ProductCards';
import  useProducts  from '../hooks/useProducts';
import { useCartContext } from '../context/CartContext';

const Shop = () => {
  const { products, loading, error } = useProducts();
  const { cartItems, addToCart, removeFromCart } = useCartContext();

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div>
      <h1>Shop</h1>
      <ProductCards
        products={products}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        cart={cartItems}
      />
    </div>
  );
};

export default Shop;