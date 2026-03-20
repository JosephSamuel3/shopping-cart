import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartProvider, useCartContext } from '../context/CartContext';

describe('CartContext', () => {
  const sampleProduct = {
    id: 1,
    title: 'Test Product',
    price: 10.99,
    image: 'test.jpg',
    category: 'test'
  };

  const sampleProduct2 = {
    id: 2,
    title: 'Test Product 2',
    price: 15.99,
    image: 'test2.jpg',
    category: 'test'
  };

  describe('useCartContext hook', () => {
    it('throws error when used outside CartProvider', () => {
      expect(() => {
        renderHook(() => useCartContext());
      }).toThrow('useCartContext must be used within a CartProvider');
    });

    it('returns context when used within CartProvider', () => {
      const wrapper = ({ children }) => (
        <CartProvider>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCartContext(), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current.cartItems).toBeDefined();
      expect(result.current.addToCart).toBeDefined();
      expect(result.current.removeFromCart).toBeDefined();
      expect(result.current.clearCart).toBeDefined();
    });
  });

  describe('CartProvider functionality', () => {
    it('initializes with empty cart', () => {
      const wrapper = ({ children }) => (
        <CartProvider>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCartContext(), { wrapper });

      expect(result.current.cartItems).toEqual([]);
    });

    it('adds item to cart', () => {
      const wrapper = ({ children }) => (
        <CartProvider>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => {
        result.current.addToCart(sampleProduct, 1);
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0]).toEqual({
        ...sampleProduct,
        quantity: 1
      });
    });

    it('adds multiple items to cart', () => {
      const wrapper = ({ children }) => (
        <CartProvider>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => {
        result.current.addToCart(sampleProduct, 1);
        result.current.addToCart(sampleProduct2, 2);
      });

      expect(result.current.cartItems).toHaveLength(2);
      expect(result.current.cartItems[0].id).toBe(1);
      expect(result.current.cartItems[1].id).toBe(2);
      expect(result.current.cartItems[1].quantity).toBe(2);
    });

    it('increments quantity when adding same item twice', () => {
      const wrapper = ({ children }) => (
        <CartProvider>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => {
        result.current.addToCart(sampleProduct, 2);
        result.current.addToCart(sampleProduct, 3);
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0].quantity).toBe(5);
    });

    it('removes item from cart', () => {
      const wrapper = ({ children }) => (
        <CartProvider>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => {
        result.current.addToCart(sampleProduct, 2);
      });

      expect(result.current.cartItems).toHaveLength(1);

      act(() => {
        result.current.removeFromCart(1);
      });

      expect(result.current.cartItems[0].quantity).toBe(1);

      act(() => {
        result.current.removeFromCart(1);
      });

      expect(result.current.cartItems).toHaveLength(0);
    });

    it('clears entire cart', () => {
      const wrapper = ({ children }) => (
        <CartProvider>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => {
        result.current.addToCart(sampleProduct, 1);
        result.current.addToCart(sampleProduct2, 2);
      });

      expect(result.current.cartItems).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.cartItems).toHaveLength(0);
    });

    it('gets item quantity', () => {
      const wrapper = ({ children }) => (
        <CartProvider>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => {
        result.current.addToCart(sampleProduct, 3);
      });

      const quantity = result.current.getItemQuantity(1);
      expect(quantity).toBe(3);
    });

    it('returns 0 for non-existent item quantity', () => {
      const wrapper = ({ children }) => (
        <CartProvider>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCartContext(), { wrapper });

      const quantity = result.current.getItemQuantity(999);
      expect(quantity).toBe(0);
    });

    it('calculates total items in cart', () => {
      const wrapper = ({ children }) => (
        <CartProvider>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => {
        result.current.addToCart(sampleProduct, 2);
        result.current.addToCart(sampleProduct2, 3);
      });

      const total = result.current.cartTotalItems();
      expect(total).toBe(5);
    });

    it('returns 0 for total items in empty cart', () => {
      const wrapper = ({ children }) => (
        <CartProvider>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCartContext(), { wrapper });

      const total = result.current.cartTotalItems();
      expect(total).toBe(0);
    });

    it('calculates total cart value', () => {
      const wrapper = ({ children }) => (
        <CartProvider>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => {
        result.current.addToCart(sampleProduct, 2); // 2 * 10.99 = 21.98
        result.current.addToCart(sampleProduct2, 1); // 1 * 15.99 = 15.99
      });

      const total = result.current.cartTotalValue();
      expect(total).toBe(37.97);
    });

    it('returns 0 for total value in empty cart', () => {
      const wrapper = ({ children }) => (
        <CartProvider>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCartContext(), { wrapper });

      const total = result.current.cartTotalValue();
      expect(total).toBe(0);
    });
  });

  describe('CartProvider with default quantity', () => {
    it('defaults to quantity 1 when not specified', () => {
      const wrapper = ({ children }) => (
        <CartProvider>{children}</CartProvider>
      );
      const { result } = renderHook(() => useCartContext(), { wrapper });

      act(() => {
        result.current.addToCart(sampleProduct);
      });

      expect(result.current.cartItems[0].quantity).toBe(1);
    });
  });
});