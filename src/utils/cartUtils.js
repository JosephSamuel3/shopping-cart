// Utility helpers for cart operations

/**
 * Add an item to the cart. If item already exists, increment its quantity.
 * Returns new cart array.
 */
function addItem(cart, item) {
  const existing = cart.find((i) => i.id === item.id);
  if (existing) {
    return cart.map((i) =>
      i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
    );
  }
  return [...cart, { ...item, quantity: 1 }];
}

/**
 * Remove an item from the cart by ID. Decrements quantity by 1. If quantity reaches 0, removes the item. Returns new cart array.
 */
function removeItem(cart, itemId) {
  return cart.map((i) =>
    i.id === itemId ? { ...i, quantity: (i.quantity || 1) - 1 } : i
  ).filter((i) => i.quantity > 0);
}

/**
 * Get the quantity of a specific item in the cart.
 */
function getQuantity(cart, itemId) {
  const item = cart.find((i) => i.id === itemId);
  return item ? item.quantity || 0 : 0;
}

/**
 * Count total distinct items in cart.
 */
function totalItems(cart) {
  return cart.reduce((sum, i) => sum + (i.quantity || 0), 0);
}

/**
 * Calculate total value of cart assuming item.price is defined.
 */
function totalValue(cart) {
  return cart.reduce((total, i) => total + (i.price || 0) * (i.quantity || 0), 0);
}

export {addItem, removeItem, getQuantity, totalItems, totalValue}
