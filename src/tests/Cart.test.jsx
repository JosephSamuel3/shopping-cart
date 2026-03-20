import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Cart from "../pages/Cart";

// Mock the CartContext
const mockUseCartContext = vi.fn();
vi.mock('../context/CartContext', () => ({
  useCartContext: () => mockUseCartContext()
}));

describe('Cart', () => {
  const mockAddToCart = vi.fn();
  const mockRemoveFromCart = vi.fn();
  const mockClearCart = vi.fn();

  const sampleCartProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 10.99,
      image: 'test1.jpg',
      quantity: 2
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 15.99,
      image: 'test2.jpg',
      quantity: 1
    }
  ];

  beforeEach(() => {
    mockUseCartContext.mockReturnValue({
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the cart title', () => {
      render(<Cart />);
      expect(screen.getByRole('heading', { name: /Your Cart/i })).toBeInTheDocument();
    });

    it('renders CartItems component with default empty cart', () => {
      render(<Cart />);
      // Since CartItems is rendered, check for its container or content
      expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });

    it('renders CartItems component with provided cartProducts', () => {
      render(<Cart cartProducts={sampleCartProducts} />);
      expect(screen.getByTestId('cart-items')).toBeInTheDocument();
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    it('passes cartProducts prop to CartItems', () => {
      render(<Cart cartProducts={sampleCartProducts} />);
      // Verify that the products are displayed, which means they were passed correctly
      expect(screen.getByText('Qty: 2')).toBeInTheDocument();
      expect(screen.getByText('Qty: 1')).toBeInTheDocument();
    });
  });

  describe('Context integration', () => {
    it('uses CartContext and passes functions to CartItems', () => {
      render(<Cart cartProducts={sampleCartProducts} />);
      // The context functions are passed to CartItems, so we can verify by checking if CartItems renders correctly
      expect(mockUseCartContext).toHaveBeenCalled();
      // Since CartItems uses these functions, I have mocked them, then we assume they're passed correctly
    });
  });

  describe('Prop validation', () => {
    it('accepts valid cartProducts prop', () => {
      render(<Cart cartProducts={sampleCartProducts} />);
      // If it renders without errors, PropTypes validation passed
      expect(screen.getByRole('heading', { name: /Your Cart/i })).toBeInTheDocument();
    });

    it('uses default empty array when cartProducts not provided', () => {
      render(<Cart />);
      expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });
  });
}); 