"use client";
import React, { createContext , useContext , useState } from 'react';
import { Product } from '@/lib/data';

interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    isCartOpen : boolean;
    setIsCartOpen : (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Product[]>([]);
    const [isCartOpen , setIsCartOpen ] = useState(false);
    const removeFromCart = (id: number )=>{
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }
    const addToCart = (product: Product) => {
        setCart((prevCart) => 
            [...prevCart, product]
        );
            setIsCartOpen(true);
    }

    return(
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
