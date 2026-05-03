"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();
    const router = useRouter();
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

    const getItemKey = (item: any) => `${item._id || item.id}-${item.selectedSize || ''}`;

    useEffect(() => {
        if (isCartOpen) {
            setSelectedKeys(new Set(cart.map(getItemKey)));
        }
    }, [isCartOpen, cart.length]);

    const handleToggleSelect = (key: string) => {
        const newKeys = new Set(selectedKeys);
        if (newKeys.has(key)) newKeys.delete(key);
        else newKeys.add(key);
        setSelectedKeys(newKeys);
    };

    const handleCheckoutSelected = () => {
        const selectedCartItems = cart.filter(item => selectedKeys.has(getItemKey(item)));
        if (selectedCartItems.length === 0) {
            alert("Please select at least one item to checkout");
            return;
        }
        sessionStorage.setItem("selectedCheckoutItems", JSON.stringify(selectedCartItems));
        setIsCartOpen(false);
        router.push("/checkout?selectedCheckout=true");
    };

    const selectedTotal = cart
        .filter(item => selectedKeys.has(getItemKey(item)))
        .reduce((total, item) => total + item.price * (item.quantity || 1), 0);

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />


            <div className="relative w-80 sm:w-96 bg-white h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Your Cart ({cart.reduce((total, item) => total + (item.quantity || 1), 0)})</h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-2xl text-gray-500 font-bold">✕</button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4">
                    {cart.length === 0 ? (
                        <p className="font-bold text-sm text-center mt-50 text-gray-900">Your Cart is empty!</p>
                    ) : (
                        cart.map((item, index) => {
                            const key = getItemKey(item);
                            const isSelected = selectedKeys.has(key);
                            return (
                            <div key={index} className={`flex gap-4 border-b pb-4 transition-opacity ${isSelected ? '' : 'opacity-50'}`}>
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        checked={isSelected} 
                                        onChange={() => handleToggleSelect(key)}
                                        className="w-5 h-5 accent-black cursor-pointer"
                                    />
                                </div>
                                <img src={item.image} className="w-20 h-20 object-contain bg-gray-50 rounded" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-sm text-gray-900">
                                        {item.title} <span className="text-orange-500 font-bold ml-1">x{item.quantity}</span>
                                    </h3>
                                    {item.selectedSize && <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>}
                                    <p className="text-gray-600 font-medium">৳{item.price * (item.quantity || 1)}</p>
                                    
                                    <div className="flex items-center border border-zinc-200 rounded-lg w-fit mt-3 overflow-hidden">
                                        <button 
                                            onClick={() => updateQuantity((item._id || item.id) as string | number, item.selectedSize, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="px-3 py-1 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 transition-colors border-r border-zinc-200 font-medium"
                                        >
                                            −
                                        </button>
                                        <span className="px-4 py-1 text-sm font-bold text-zinc-900 bg-white">
                                            {item.quantity}
                                        </span>

                                        <button 
                                            onClick={() => updateQuantity((item._id || item.id) as string | number, item.selectedSize, item.quantity + 1)}
                                            className="px-3 py-1 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 transition-colors border-l border-zinc-200 font-medium"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div>
                                <button onClick={() => removeFromCart((item._id || item.id) as string | number, item.selectedSize)} className="text-red-500 hover:text-red-700 font-bold px-2 self-start">✕</button>
                                
                                </div>
                            </div>
                            );
                        })
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between text-xl text-gray-900 font-bold mb-4">
                            <span>Selected Total:</span>
                            <span>৳{selectedTotal}</span>
                        </div>
                        <button onClick={handleCheckoutSelected} className="w-full bg-black text-white py-4 rounded-xl font-bold">
                            Checkout Selected ({selectedKeys.size})
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;