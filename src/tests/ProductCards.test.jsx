import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCards from '../components/ProductCards';

describe('ProductCards', () => {
    const mockAddToCart = vi.fn();
    const mockRemoveFromCart = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

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
    const emptyCart = [];
    const cartWithItem = [{ id: 1, quantity: 2 }];

    describe('ProductCards component', () => {
        it('renders "No products available" when products array is empty', () => {
            render(
                <ProductCards
                    products={[]}
                    addToCart={mockAddToCart}
                    removeFromCart={mockRemoveFromCart}
                    cart={emptyCart}
                />
            );
            expect(screen.getByText('No products available.')).toBeInTheDocument();
        });

        it('renders "No products available" when products is null', () => {
            render(
                <ProductCards
                    products={null}
                    addToCart={mockAddToCart}
                    removeFromCart={mockRemoveFromCart}
                    cart={emptyCart}
                />
            );
            expect(screen.getByText('No products available.')).toBeInTheDocument();
        });

        it('renders product cards when products are provided', () => {
            render(
                <ProductCards
                    products={sampleProducts}
                    addToCart={mockAddToCart}
                    removeFromCart={mockRemoveFromCart}
                    cart={emptyCart}
                />
            );
            expect(screen.getByTestId('product-list')).toBeInTheDocument();
            expect(screen.getAllByTestId('product-card')).toHaveLength(2);
        });
    });

    describe('Card component', () => {
        it('displays product information correctly', () => {
            render(
                <ProductCards
                    products={[sampleProducts[0]]}
                    addToCart={mockAddToCart}
                    removeFromCart={mockRemoveFromCart}
                    cart={emptyCart}
                />
            );
            expect(screen.getByText('Test Product 1')).toBeInTheDocument();
            expect(screen.getByText('electronics')).toBeInTheDocument();
            expect(screen.getByText('$10.99')).toBeInTheDocument();
            expect(screen.getByAltText('Test Product 1')).toBeInTheDocument();
        });

        it('shows add to cart button and not remove button when item not in cart', () => {
            render(
                <ProductCards
                    products={[sampleProducts[0]]}
                    addToCart={mockAddToCart}
                    removeFromCart={mockRemoveFromCart}
                    cart={emptyCart}
                />
            );
            expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
            expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument();
        });

        it('shows remove button when item is in cart', () => {
            render(
                <ProductCards
                    products={[sampleProducts[0]]}
                    addToCart={mockAddToCart}
                    removeFromCart={mockRemoveFromCart}
                    cart={cartWithItem}
                />
            );

            expect(screen.getByRole('button', { name: /^remove$/i })).toBeInTheDocument();
        });

        it('calls addToCart with correct arguments when add button is clicked', () => {
            render(
                <ProductCards
                    products={[sampleProducts[0]]}
                    addToCart={mockAddToCart}
                    removeFromCart={mockRemoveFromCart}
                    cart={emptyCart}
                />
            );
            fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
            expect(mockAddToCart).toHaveBeenCalledWith(sampleProducts[0], 1);
        });

        it('calls removeFromCart with correct id when remove button is clicked', () => {
            render(
                <ProductCards
                    products={[sampleProducts[0]]}
                    addToCart={mockAddToCart}
                    removeFromCart={mockRemoveFromCart}
                    cart={cartWithItem}
                />
            );
            fireEvent.click(screen.getByRole('button', { name: /^remove$/i }));
            expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
        });

        it('increments quantity when + button is clicked', () => {
            render(
                <ProductCards
                    products={[sampleProducts[0]]}
                    addToCart={mockAddToCart}
                    removeFromCart={mockRemoveFromCart}
                    cart={emptyCart}
                />
            );
            const increaseButton = screen.getByRole('button', { name: /increase quantity for test product 1/i });
            const quantityInput = screen.getByRole('spinbutton', { name: /quantity for test product 1/i });

            expect(quantityInput).toHaveValue(1);
            fireEvent.click(increaseButton);
            expect(quantityInput).toHaveValue(2);
        });

        it('decrements quantity when - button is clicked and quantity > 1', () => {
            render(
                <ProductCards
                    products={[sampleProducts[0]]}
                    addToCart={mockAddToCart}
                    removeFromCart={mockRemoveFromCart}
                    cart={emptyCart}
                />
            );
            const increaseButton = screen.getByRole('button', { name: /increase quantity for test product 1/i });
            const decreaseButton = screen.getByRole('button', { name: /decrease quantity for test product 1/i });
            const quantityInput = screen.getByRole('spinbutton', { name: /quantity for test product 1/i });

            fireEvent.click(increaseButton);
            expect(quantityInput).toHaveValue(2);
            fireEvent.click(decreaseButton);
            expect(quantityInput).toHaveValue(1);
        });

        it('does not decrement below 1', () => {
            render(
                <ProductCards
                    products={[sampleProducts[0]]}
                    addToCart={mockAddToCart}
                    removeFromCart={mockRemoveFromCart}
                    cart={emptyCart}
                />
            );
            const decreaseButton = screen.getByRole('button', { name: /decrease quantity for test product 1/i });
            const quantityInput = screen.getByRole('spinbutton', { name: /quantity for test product 1/i });

            fireEvent.click(decreaseButton);
            expect(quantityInput).toHaveValue(1);
        });

        it('updates quantity when input value changes', () => {
            render(
                <ProductCards
                    products={[sampleProducts[0]]}
                    addToCart={mockAddToCart}
                    removeFromCart={mockRemoveFromCart}
                    cart={emptyCart}
                />
            );
            const quantityInput = screen.getByRole('spinbutton', { name: /quantity for test product 1/i });
            fireEvent.change(quantityInput, { target: { value: '5' } });
            expect(quantityInput).toHaveValue(5);
        });

        it('sets quantity to 1 when invalid input is entered', () => {
            render(
                <ProductCards
                    products={[sampleProducts[0]]}
                    addToCart={mockAddToCart}
                    removeFromCart={mockRemoveFromCart}
                    cart={emptyCart}
                />
            );
            const quantityInput = screen.getByRole('spinbutton', { name: /quantity for test product 1/i });
            fireEvent.change(quantityInput, { target: { value: 'abc' } });
            expect(quantityInput).toHaveValue(1);
        });

        it('calls addToCart with updated quantity', () => {
            render(
                <ProductCards
                    products={[sampleProducts[0]]}
                    addToCart={mockAddToCart}
                    removeFromCart={mockRemoveFromCart}
                    cart={emptyCart}
                />
            );
            const increaseButton = screen.getByRole('button', { name: /increase quantity for test product 1/i });
            fireEvent.click(increaseButton);
            fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
            expect(mockAddToCart).toHaveBeenCalledWith(sampleProducts[0], 2);
        });
    });
});