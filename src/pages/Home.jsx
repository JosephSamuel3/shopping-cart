
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';

const Home = () => {
    return (
        <div className={styles.home}>
            
           <section className={styles.ctaSection}>
                <h1>Welcome to Shoppr</h1>
                <p>Your one-stop shop for amazing products!</p>
                <Link to="/shop">Start Shopping</Link>
            </section>

            <section className={styles.infoSection}>
                <h2>Discover Products That Actually Last</h2>
                <p>
                    Shop high-quality essentials crafted for durability, comfort, and timeless design—
                    everything you need, all in one place.
                </p>
            </section>

            <section className={styles.productsSection}>
                <div className={styles.grid}>
                   <Link to="/shop" className={styles.productLink}>
                        <div className={`${styles.cardImg} ${styles.clothing}`}></div>

                        <div className={styles.content}>
                            <h3>Clothing</h3>
                            <span>Shop Clothing</span>
                        </div>
                    </Link>

                    <Link to="/shop" className={styles.productLink}>
                        <div className={`${styles.cardImg} ${styles.jewelry}`}></div>

                        <div className={styles.content}>
                            <h3>Jewelry</h3>
                            <span>Shop Jewelry</span>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;