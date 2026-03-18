
import ProductCards from '../components/ProductCards';
import  useProducts  from '../hooks/useProducts';
import { useCartContext } from '../context/CartContext';
import styles from '../styles/Shop.module.css';

const Shop = () => {
  const { products, loading, error } = useProducts();
  const { cartItems, addToCart, removeFromCart } = useCartContext();

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <section className={styles.shop}>
      <h1 className={styles.title}>Shop</h1>
        <ProductCards
          products={products}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cart={cartItems}
        />
    </section>
  );
};

export default Shop;