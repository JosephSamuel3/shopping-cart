import PropTypes from "prop-types";
import styles from "../styles/ProductCards.module.css";

const Card = ({ product, addToCart, removeFromCart, cart }) => {
  const inCart = cart.find((i) => i.id === product.id);

  return (
    <div className={styles.card} data-testid="product-card">
      <img
        src={product.image}
        alt={product.title}
        className={styles.image}
      />
      <h2 className={styles.title}>{product.title}</h2>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
      <div className={styles.actions}>
        <button
          onClick={() => addToCart(product)}
          className={styles.add}
        >
          Add to cart
        </button>
        {inCart && (
          <button
            onClick={() => removeFromCart(product.id)}
            className={styles.remove}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  product: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
};

const ProductCards = ({ products, addToCart, removeFromCart, cart }) => {
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className={styles.grid} data-testid="product-list">
      {products.map((p) => (
        <Card
          key={p.id}
          product={p}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cart={cart}
        />
      ))}
    </div>
  );
};

ProductCards.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
};

export default ProductCards;