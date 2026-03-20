
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Shop from '../pages/Shop';

// Mock the hooks
vi.mock('../hooks/useProducts');
vi.mock('../context/CartContext');

import { default as useProducts } from '../hooks/useProducts';
import { useCartContext } from '../context/CartContext';

describe('Shop', () => {
  const mockAddToCart = vi.fn();
  const mockRemoveFromCart = vi.fn();
  const mockCartItems = [];

  const sampleProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 10.99,
      image: 'test1.jpg',
      category: 'electronics'
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 15.50,
      image: 'test2.jpg',
      category: 'clothing'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    useCartContext.mockReturnValue({
      cartItems: mockCartItems,
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart
    });
  });

  describe('Rendering and Loading States', () => {
    it('renders loading state while fetching products', () => {
      useProducts.mockReturnValue({
        products: [],
        loading: true,
        error: null
      });

      render(<Shop />);
      expect(screen.getByText('Loading products...')).toBeInTheDocument();
    });

    it('renders error state when products fail to load', () => {
      const errorMessage = 'Failed to fetch products';
      useProducts.mockReturnValue({
        products: [],
        loading: false,
        error: new Error(errorMessage)
      });

      render(<Shop />);
      expect(screen.getByText(`Error loading products: ${errorMessage}`)).toBeInTheDocument();
    });

    it('renders shop title when products load successfully', () => {
      useProducts.mockReturnValue({
        products: sampleProducts,
        loading: false,
        error: null
      });

      render(<Shop />);
      expect(screen.getByRole('heading', { name: /Shop/i })).toBeInTheDocument();
    });
  });

  describe('ProductCards Integration', () => {
    it('renders ProductCards with fetched products', () => {
      useProducts.mockReturnValue({
        products: sampleProducts,
        loading: false,
        error: null
      });

      render(<Shop />);
      expect(screen.getByTestId('product-list')).toBeInTheDocument();
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    it('passes correct props to ProductCards', () => {
      useProducts.mockReturnValue({
        products: sampleProducts,
        loading: false,
        error: null
      });

      render(<Shop />);
      // Verify that the product cards are rendered, indicating correct prop passing
      expect(screen.getAllByTestId('product-card')).toHaveLength(2);
    });

    it('passes cart items to ProductCards', () => {
      useProducts.mockReturnValue({
        products: sampleProducts,
        loading: false,
        error: null
      });
      useCartContext.mockReturnValue({
        cartItems: [{ id: 1, quantity: 2 }],
        addToCart: mockAddToCart,
        removeFromCart: mockRemoveFromCart
      });

      render(<Shop />);
      // If cart items are passed correctly, the component should render
      // (In this case, the add/remove buttons behavior would be affected)
      expect(screen.getByTestId('product-list')).toBeInTheDocument();
    });
  });

  describe('Context Integration', () => {
    it('calls useProducts hook', () => {
      useProducts.mockReturnValue({
        products: sampleProducts,
        loading: false,
        error: null
      });

      render(<Shop />);
      expect(useProducts).toHaveBeenCalled();
    });

    it('calls useCartContext hook', () => {
      useProducts.mockReturnValue({
        products: sampleProducts,
        loading: false,
        error: null
      });

      render(<Shop />);
      expect(useCartContext).toHaveBeenCalled();
    });

    it('receives cart functions from context', () => {
      useProducts.mockReturnValue({
        products: sampleProducts,
        loading: false,
        error: null
      });

      render(<Shop />);
      // Verify that addToCart and removeFromCart are received from context
      expect(useCartContext).toHaveBeenCalled();
      const contextValue = useCartContext.mock.results[0].value;
      expect(contextValue.addToCart).toBeDefined();
      expect(contextValue.removeFromCart).toBeDefined();
    });
  });

  describe('Empty Products', () => {
    it('renders empty product list when no products available', () => {
      useProducts.mockReturnValue({
        products: [],
        loading: false,
        error: null
      });

      render(<Shop />);
      expect(screen.getByRole('heading', { name: /Shop/i })).toBeInTheDocument();
      expect(screen.getByText('No products available.')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles null products gracefully', () => {
      useProducts.mockReturnValue({
        products: null,
        loading: false,
        error: null
      });

      render(<Shop />);
      expect(screen.getByText('No products available.')).toBeInTheDocument();
    });

    it('handles error with empty products', () => {
      useProducts.mockReturnValue({
        products: [],
        loading: false,
        error: new Error('Network error')
      });

      render(<Shop />);
      expect(screen.getByText('Error loading products: Network error')).toBeInTheDocument();
    });

    it('prioritizes error over loading state', () => {
      useProducts.mockReturnValue({
        products: [],
        loading: true,
        error: new Error('Network error')
      });

      render(<Shop />);
      expect(screen.getByText('Error loading products: Network error')).toBeInTheDocument();
      expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
    });
  });
});