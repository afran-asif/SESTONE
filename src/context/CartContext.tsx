"use client";
import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/lib/data';

export interface CartItem extends Product {
    quantity: number;
    selectedSize?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: CartItem) => void;
    removeFromCart: (id: number, selectedSize?: string) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const clearCart = () => setCart([]);

    const removeFromCart = (id: number, selectedSize?: string) => {
        setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.selectedSize === selectedSize)));
    };

    const addToCart = (newItem: CartItem) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (item) => item.id === newItem.id && item.selectedSize === newItem.selectedSize
            );

            if (existingItemIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + (newItem.quantity || 1)
                };
                return updatedCart;
            } else {
                return [...prevCart, { ...newItem, quantity: newItem.quantity || 1 }];
            }
        });
        setIsCartOpen(true);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
