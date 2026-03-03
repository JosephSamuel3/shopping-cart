import { useState } from "react";
import styles from "../styles/Nav.module.css";
import { Link } from "react-router-dom";
import { getTotalItems } from "../utils/cartUtils";
import PropTypes from "prop-types";

const NavBar = ({ cartItems = [] }) => {
    const [navActive, setNavActive] = useState(false);

    const totalItems = getTotalItems(cartItems);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1 className={styles.heading}>Shoppr</h1>
            </div>

            <button
                className={styles.burger}
                onClick={() => setNavActive((v) => !v)}
                aria-label="Toggle menu"
            >
                &#9776;
            </button>

            <nav className={`${styles.nav} ${navActive ? styles.navVisible : ""}`}>
                <ul>
                    <li className={styles.navLinks}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.navLinks}>
                        <Link to="/shop">Shop</Link>
                    </li>
                    <li className={styles.navLinks}>
                        <Link to="/cart">
                            Cart {totalItems > 0 && <span>({totalItems})</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

NavBar.PropTypes = {
    cartItems: PropTypes.array
}

export default NavBar;