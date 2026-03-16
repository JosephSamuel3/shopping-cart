
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <section>
                <h1>Welcome to Shoppr</h1>
                <p>Your one-stop shop for amazing products!</p>
                <Link to="/shop">Start Shopping</Link>
            </section>
            <section>
                <h2>Featured Products</h2>
                <p>Check out our latest arrivals and best sellers.</p>
                <Link to="/shop">Browse Shop</Link>
            </section>
        </div>
    );
};

export default Home;