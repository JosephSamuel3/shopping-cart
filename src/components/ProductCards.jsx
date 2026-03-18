import { useState } from 'react';
import PropTypes from "prop-types";
import styles from "../styles/ProductCards.module.css";

const Card = ({ product, addToCart, removeFromCart, cart }) => {
  const [quantity, setQuantity] = useState(1);
  const inCart = cart.find((i) => i.id === product.id);

  const handleQuantityChange = (value) => {
    const parsedValue = parseInt(value, 10);
    setQuantity(isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue);
  };

  return (
    <article className={styles.card} data-testid="product-card">
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.category}>{product.category}</p>
        
        <div className={styles.priceSection}>
          
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          
          <div className={styles.quantityControls}>
            <button
              aria-label={`Decrease quantity for ${product.title}`}
              className={styles.quantityBtn}
              disabled={quantity <= 1}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              type="button"
            >
              -
            </button>
            <input
              aria-label={`Quantity for ${product.title}`}
              className={styles.quantityInput}
              min={1}
              onChange={(event) => handleQuantityChange(event.target.value)}
              step={1}
              type="number"
              value={quantity}
            />
            <button
              aria-label={`Increase quantity for ${product.title}`}
              className={styles.quantityBtn}
              onClick={() => setQuantity(quantity + 1)}
              type="button"
            >
              +
            </button>
          </div>
        </div>
        <button
          className={styles.addToCart}
          onClick={() => addToCart(product, quantity)}
          type="button"
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
    </article>
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
      <div className={styles.wrapper}>
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