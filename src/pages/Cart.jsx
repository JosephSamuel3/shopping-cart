import PropTypes from 'prop-types';
import CartItems from '../components/CartItems';
import { useCartContext } from '../context/CartContext';

const Cart = ({ cartProducts = [] }) => {
  const { addToCart, removeFromCart, clearCart } = useCartContext();

  return (
    <div>
      <h1>Your Cart</h1>
      <CartItems
        cart={cartProducts}
        addItem={addToCart}
        removeItem={removeFromCart}
        emptyCart={clearCart}
      />
    </div>
  );
};

Cart.propTypes = {
  cartProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ),
};

export default Cart;