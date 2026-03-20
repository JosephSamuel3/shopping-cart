import { describe, it, expect } from 'vitest';
import { addItem, removeItem, getQuantity, totalItems, totalValue } from '../utils/cartUtils';

describe('cartUtils', () => {
    const sampleProduct = {
        id: 1,
        title: 'Test Product',
        price: 10.99,
        image: 'test.jpg',
        category: 'test'
    };

    describe('addItem', () => {
        it('should add a new item to an empty cart', () => {
            const cart = [];
            const result = addItem(cart, sampleProduct, 1);
            expect(result).toEqual([{ ...sampleProduct, quantity: 1 }]);
        });

        it('should add a new item with default quantity of 1', () => {
            const cart = [];
            const result = addItem(cart, sampleProduct);
            expect(result).toEqual([{ ...sampleProduct, quantity: 1 }]);
        });

        it('should increment quantity of existing item', () => {
            const cart = [{ ...sampleProduct, quantity: 2 }];
            const result = addItem(cart, sampleProduct, 3);
            expect(result).toEqual([{ ...sampleProduct, quantity: 5 }]);
        });

        it('should add multiple different items', () => {
            const cart = [{ ...sampleProduct, quantity: 1 }];
            const newProduct = { ...sampleProduct, id: 2, title: 'New Product' };
            const result = addItem(cart, newProduct, 2);
            expect(result).toHaveLength(2);
            expect(result.find(item => item.id === 1).quantity).toBe(1);
            expect(result.find(item => item.id === 2).quantity).toBe(2);
        });
    });

    describe('removeItem', () => {
        it('should decrement quantity of existing item', () => {
            const cart = [{ ...sampleProduct, quantity: 3 }];
            const result = removeItem(cart, 1);
            expect(result).toEqual([{ ...sampleProduct, quantity: 2 }]);
        });

        it('should remove item when quantity reaches 0', () => {
            const cart = [{ ...sampleProduct, quantity: 1 }];
            const result = removeItem(cart, 1);
            expect(result).toEqual([]);
        });

        it('should not affect other items', () => {
            const cart = [
                { ...sampleProduct, quantity: 2 },
                { ...sampleProduct, id: 2, quantity: 1 }
            ];
            const result = removeItem(cart, 1);
            expect(result).toHaveLength(2);
            expect(result.find(item => item.id === 1).quantity).toBe(1);
            expect(result.find(item => item.id === 2).quantity).toBe(1);
        });

        it('should handle non-existent item gracefully', () => {
            const cart = [{ ...sampleProduct, quantity: 1 }];
            const result = removeItem(cart, 999);
            expect(result).toEqual([{ ...sampleProduct, quantity: 1 }]);
        });
    });

    describe('getQuantity', () => {
        it('should return quantity of existing item', () => {
            const cart = [{ ...sampleProduct, quantity: 5 }];
            const result = getQuantity(cart, 1);
            expect(result).toBe(5);
        });

        it('should return 0 for non-existent item', () => {
            const cart = [{ ...sampleProduct, quantity: 1 }];
            const result = getQuantity(cart, 999);
            expect(result).toBe(0);
        });

        it('should return 0 for empty cart', () => {
            const cart = [];
            const result = getQuantity(cart, 1);
            expect(result).toBe(0);
        });
    });

    describe('totalItems', () => {
        it('should return 0 for empty cart', () => {
            const cart = [];
            const result = totalItems(cart);
            expect(result).toBe(0);
        });

        it('should sum quantities of all items', () => {
            const cart = [
                { ...sampleProduct, quantity: 2 },
                { ...sampleProduct, id: 2, quantity: 3 }
            ];
            const result = totalItems(cart);
            expect(result).toBe(5);
        });

        it('should handle items without quantity property', () => {
            const cart = [{ ...sampleProduct }]; // no quantity
            const result = totalItems(cart);
            expect(result).toBe(0);
        });
    });

    describe('totalValue', () => {
        it('should return 0 for empty cart', () => {
            const cart = [];
            const result = totalValue(cart);
            expect(result).toBe(0);
        });

        it('should calculate total value correctly', () => {
            const cart = [
                { ...sampleProduct, quantity: 2 }, // 2 * 10.99 = 21.98
                { ...sampleProduct, id: 2, price: 5.50, quantity: 3 } // 3 * 5.50 = 16.50
            ];
            const result = totalValue(cart);
            expect(result).toBeCloseTo(38.48, 2);
        });

        it('should handle items without price property', () => {
            const cart = [{ ...sampleProduct, quantity: 2 }]; // has price
            delete cart[0].price;
            const result = totalValue(cart);
            expect(result).toBe(0);
        });

        it('should handle items without quantity property', () => {
            const cart = [{ ...sampleProduct }]; // no quantity, has price
            const result = totalValue(cart);
            expect(result).toBe(0);
        });
    });
});