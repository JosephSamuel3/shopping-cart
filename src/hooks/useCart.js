import { useState, useCallback, useMemo } from 'react';
import {
    addItemToCart,
    removeItemFromCart,
    getItemQuantity,
    getTotalItems,
    getCartValue,
} from '../utils/cartUtils';

export default function useCart(initialItems = []) {
    const [cart, setCart] = useState(initialItems);

    const addItem = useCallback((item) => {
        setCart((prev) => addItemToCart(prev, item));
    }, []);

    const removeItem = useCallback((itemId) => {
        setCart((prev) => removeItemFromCart(prev, itemId));
    }, []);

    const emptyCart = useCallback(() => {
        setCart([]);
    }, []);

    // derived values
    const getQuantity = useCallback(
        (itemId) => getItemQuantity(cart, itemId),
        [cart]
    );

    const totalItems = useMemo(() => getTotalItems(cart), [cart]);
    const totalValue = useMemo(() => getCartValue(cart), [cart]);

    return {
        cart,
        addItem,
        removeItem,
        emptyCart,
        getQuantity,
        totalItems,
        totalValue,
    };
}
