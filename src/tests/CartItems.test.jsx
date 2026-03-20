import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CartItems from "../components/CartItems";

describe('CartItems', () => {
    const mockAddItem = vi.fn();
    const mockRemoveItem = vi.fn();
    const mockEmptyCart = vi.fn();
    const sampleCartItems = [
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

    describe('Rendering cart items', () => {
        it('Renders "Your cart is empty" when cart array is empty', () => {
            render(
                <CartItems
                    cart={[]}
                    addItem={mockAddItem}
                    removeItem={mockRemoveItem}
                    emptyCart={mockEmptyCart}
                />
            );
            expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
        });

        it('Renders "Your cart is empty" when cart is null', () => {
            render(
                <CartItems
                    cart={null}
                    addItem={mockAddItem}
                    removeItem={mockRemoveItem}
                    emptyCart={mockEmptyCart}
                />
            );
            expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
        });

        it('Renders cart items when cart array has items', () => {
            render(
                <CartItems
                    cart={sampleCartItems}
                    addItem={mockAddItem}
                    removeItem={mockRemoveItem}
                    emptyCart={mockEmptyCart}
                />
            );
            expect(screen.getByTestId('cart-items')).toBeInTheDocument();
            expect(screen.getAllByRole('listitem')).toHaveLength(2);
        });

        it('Displays cart item information correctly', () => {
            render(
                <CartItems
                    cart={[sampleCartItems[0]]}
                    addItem={mockAddItem}
                    removeItem={mockRemoveItem}
                    emptyCart={mockEmptyCart}
                />
            );
            expect(screen.getByText('Test Product 1')).toBeInTheDocument();
            expect(screen.getByText('$10.99')).toBeInTheDocument();
            expect(screen.getByText('Qty: 2')).toBeInTheDocument();
            expect(screen.getByAltText('Test Product 1')).toBeInTheDocument();
        });

        it('Displays total price correctly', () => {
            render(
                <CartItems
                    cart={sampleCartItems}
                    addItem={mockAddItem}
                    removeItem={mockRemoveItem}
                    emptyCart={mockEmptyCart}
                />
            );
            // Total: 2 * 10.99 + 1 * 15.99 = 21.98 + 15.99 = 37.97
            expect(screen.getByText('Total: $37.97')).toBeInTheDocument();
        });

        it('Displays action buttons for each item and clear cart button', () => {
            render(
                <CartItems
                    cart={[sampleCartItems[0]]}
                    addItem={mockAddItem}
                    removeItem={mockRemoveItem}
                    emptyCart={mockEmptyCart}
                />
            );
            expect(screen.getAllByRole('button', { name: '-' })).toHaveLength(1);
            expect(screen.getAllByRole('button', { name: '+' })).toHaveLength(1);
            expect(screen.getByRole('button', { name: /Clear Cart/i })).toBeInTheDocument();
        });
    });

    describe('User interactions', () => {
        it('Calls removeItem with correct id when - button is clicked', () => {
            render(
                <CartItems
                    cart={[sampleCartItems[0]]}
                    addItem={mockAddItem}
                    removeItem={mockRemoveItem}
                    emptyCart={mockEmptyCart}
                />
            );
            const removeButton = screen.getByRole('button', { name: '-' });
            fireEvent.click(removeButton);
            expect(mockRemoveItem).toHaveBeenCalledWith(1);
        });

        it('Calls addItem with correct item when + button is clicked', () => {
            render(
                <CartItems
                    cart={[sampleCartItems[0]]}
                    addItem={mockAddItem}
                    removeItem={mockRemoveItem}
                    emptyCart={mockEmptyCart}
                />
            );
            const addButton = screen.getByRole('button', { name: '+' });
            fireEvent.click(addButton);
            expect(mockAddItem).toHaveBeenCalledWith(sampleCartItems[0]);
        });

        it('Calls emptyCart when Clear Cart button is clicked', () => {
            render(
                <CartItems
                    cart={sampleCartItems}
                    addItem={mockAddItem}
                    removeItem={mockRemoveItem}
                    emptyCart={mockEmptyCart}
                />
            );
            const clearButton = screen.getByRole('button', { name: /Clear Cart/i });
            fireEvent.click(clearButton);
            expect(mockEmptyCart).toHaveBeenCalled();
        });
    });
});