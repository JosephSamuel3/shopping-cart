import { useState } from "react";
import styles from "../styles/Nav.module.css";
import { Link, useLocation } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

const NavBar = () => {
    const { cartTotalItems } = useCartContext();
    const totalItems = cartTotalItems();
    const location = useLocation();

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1 className={styles.heading}>Shoppr</h1>
            </div>

            <nav className={styles.nav}>
                <ul>
                    <li className={styles.navLinks}>
                        <Link to="/" className={location.pathname === "/" ? styles.active : ""}>Home</Link>
                    </li>
                    <li className={styles.navLinks}>
                        <Link to="/shop" className={location.pathname === "/shop" ? styles.active : ""}>Shop</Link>
                    </li>
                    <li className={styles.navLinks}>
                        <Link to="/cart" className={location.pathname === "/cart" ? styles.active : ""}>
                            Cart {totalItems > 0 && <span>({totalItems})</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};


export default NavBar;