"use client";
import { useCart } from "@/context/CartContext";

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart } = useCart();

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
                        <p className="font-bold text-sm text-gray-900">Your Cart is empty!</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="flex gap-4 border-b pb-4">
                                <img src={item.image} className="w-20 h-20 object-contain bg-gray-50 rounded" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-sm text-gray-900">
                                        {item.title} <span className="text-orange-500 font-bold ml-1">x{item.quantity}</span>
                                    </h3>
                                    {item.selectedSize && <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>}
                                    <p className="text-gray-600 font-medium">৳{item.price * (item.quantity || 1)}</p>
                                </div>
                                <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="text-red-500 hover:text-red-700 font-bold px-2 self-start">✕</button>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between text-xl text-gray-900 font-bold mb-4">
                            <span>Total:</span>
                            <span>৳{cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0)}</span>
                        </div>
                        <button className="w-full bg-black text-white py-4 rounded-xl font-bold">Checkout Now</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;