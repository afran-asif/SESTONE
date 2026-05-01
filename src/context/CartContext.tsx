"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/data';
import { Quando } from 'next/font/google';

export interface CartItem extends Product {
    quantity: number;
    selectedSize?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: CartItem) => void;
    removeFromCart: (id: string | number, selectedSize?: string) => void;
    updateQuantity: (id: string | number, selectedSize: string | undefined, newQuantity: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to parse cart from localStorage:', error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    const clearCart = () => setCart([]);

    const removeFromCart = (id: string | number, selectedSize?: string) => {
        setCart((prevCart) => prevCart.filter((item) => !((item._id || item.id) === id && item.selectedSize === selectedSize)));
    };
    const updateQuantity = (id: string | number, selectedSize: string | undefined , newQuantity : number) => {
        if (newQuantity < 1){
            removeFromCart(id, selectedSize);
            return;
        }
        setCart((prevCart) => 
            prevCart.map((item)=>
                (item._id || item.id) === id && item.selectedSize === selectedSize 
                    ? {...item, quantity: newQuantity}
                    : item 
            )
        )
    }
    const addToCart = (newItem: CartItem) => {
        setCart((prevCart) => {
            const newItemId = newItem._id || newItem.id;
            const existingItemIndex = prevCart.findIndex(
                (item) => (item._id || item.id) === newItemId && item.selectedSize === newItem.selectedSize
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
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen, isLoaded, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
