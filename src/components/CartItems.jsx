import PropTypes from "prop-types";
import styles from "../styles/CartItems.module.css";
import { totalValue } from "../utils/cartUtils";

const CartItems = ({ cart = [], addItem, removeItem, emptyCart }) => {
  if (!cart || cart.length === 0) {
    return <p className={styles.empty}>Your cart is empty.</p>;
  }

  const totalPrice = totalValue(cart)

  return (
    <div className={styles.container} data-testid="cart-items">
      <ul className={styles.list}>
        {cart.map((item) => (
          <li key={item.id} className={styles.item}>
            <img src={item.image} alt={item.title} className={styles.image} />
            <div className={styles.details}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.price}>${item.price.toFixed(2)}</span>
              <span className={styles.quantity}>Qty: {item.quantity}</span>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => addItem(item)}
                className={styles.add}
              >
                +
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className={styles.remove}
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <span>Total: ${totalPrice.toFixed(2)}</span>
        <button onClick={emptyCart} className={styles.clear}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

CartItems.propTypes = {
  cart: PropTypes.array.isRequired,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired,
};

export default CartItems;