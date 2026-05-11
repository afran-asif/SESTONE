"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { cart: contextCart, clearCart, removeFromCart } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isBuyNow, setIsBuyNow] = useState(false);
    const [buyNowCart, setBuyNowCart] = useState<any[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get("buyNow") === "true") {
                setIsBuyNow(true);
                const item = sessionStorage.getItem("buyNowItem");
                if (item) {
                    setBuyNowCart([JSON.parse(item)]);
                }
            } else if (urlParams.get("selectedCheckout") === "true") {
                setIsBuyNow(true);
                const items = sessionStorage.getItem("selectedCheckoutItems");
                if (items) {
                    setBuyNowCart(JSON.parse(items));
                }
            }
        }
    }, []);

    const cart = isBuyNow ? buyNowCart : contextCart;

    // Delivery fee state
    const [deliveryArea, setDeliveryArea] = useState<"inside" | "outside">("inside");
    const deliveryFee = deliveryArea === "inside" ? 70 : 120;

    // Subtotal
    const subtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    const totalAmount = subtotal + (cart.length > 0 ? deliveryFee : 0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const orderData = {
            fullName: (e.currentTarget.elements.namedItem("fullName") as HTMLInputElement).value,
            phone: (e.currentTarget.elements.namedItem("phone") as HTMLInputElement).value,
            address: (e.currentTarget.elements.namedItem("address") as HTMLTextAreaElement).value,
            deliveryArea,
            cartItems: cart,
            subtotal,
            deliveryFee,
            totalAmount,
        }
        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();
            if (result.success) {
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.get("buyNow") === "true") {
                    sessionStorage.removeItem("buyNowItem");
                } else if (urlParams.get("selectedCheckout") === "true") {
                    sessionStorage.removeItem("selectedCheckoutItems");
                    buyNowCart.forEach(item => {
                        removeFromCart(item._id || item.id, item.selectedSize);
                    });
                } else {
                    clearCart();
                }
                router.push(`/thank-you/${result.orderId}`);
            } else {
                alert("অর্ডার করার সময় কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
            }
        } catch (error) {
            alert("অর্ডার করার সময় কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isMounted) return <div className="text-center py-20 text-gray-500">Loading checkout...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 py-12">
            <h1 className="text-4xl text-orange-500 font-black uppercase italic mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column Form */}
                <div>
                    <h2 className="text-2xl text-orange-500 font-black uppercase italic mb-6">Shipping Details</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">FULL NAME:</label>
                            <input
                                type="text"
                                name="fullName"
                                className="w-full bg-gray-100 text-gray-700 placeholder-gray-400 p-4 outline-none focus:ring-2 focus:ring-black"
                                placeholder="Enter your full name..."
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">PHONE NUMBER:</label>
                            <input
                                type="tel"
                                name="phone"
                                className="w-full bg-gray-100 text-gray-700 placeholder-gray-400 p-4 outline-none focus:ring-2 focus:ring-black"
                                placeholder="Enter your phone number..."
                                required
                                pattern="[0-9]{11,}"
                                title="Phone number must be at least 11 digits"
                                onInput={(e) => {
                                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">DELIVERY AREA:</label>
                            <select
                                className="w-full bg-gray-100 text-gray-900 p-4 font-bold outline-none focus:ring-2 focus:ring-black cursor-pointer appearance-none"
                                value={deliveryArea}
                                onChange={(e) => setDeliveryArea(e.target.value as "inside" | "outside")}
                            >
                                <option value="inside">Inside Dhaka (৳70)</option>
                                <option value="outside">Outside Dhaka (৳120)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">FULL ADDRESS:</label>
                            <textarea
                                name="address"
                                className="w-full bg-gray-100 text-gray-700 placeholder-gray-400 p-4 outline-none focus:ring-2 focus:ring-black min-h-[120px]"
                                placeholder="Enter your complete address..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || cart.length === 0}
                            className="w-full bg-black text-white font-bold tracking-widest uppercase py-4 mt-4 hover:scale-[1.02] transition-transform duration-200 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Processing..." : "Confirm Order"}
                        </button>
                    </form>
                </div>

                {/* Right Column: Order Summary */}
                <div className="bg-gray-50 p-6 sm:p-8">
                    <h2 className="text-2xl text-gray-600 font-black uppercase italic mb-6">Order Summary</h2>

                    {cart.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="font-bold text-gray-500 mb-4">Your cart is empty.</p>
                            <Link href="/" className="text-black underline font-bold uppercase tracking-wide">
                                Return to Shop
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                {cart.map((item, index) => (
                                    <div key={index} className="flex gap-4 border-b border-gray-200 pb-4">
                                        <div className="w-24 h-24 bg-white flex-shrink-0 flex items-center justify-center p-2 rounded shadow-sm">
                                            <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h3 className="font-bold text-sm text-gray-900 line-clamp-2">{item.title}</h3>
                                                    {item.selectedSize && (
                                                        <p className="text-xs text-gray-500 mt-1 uppercase font-bold">Size: {item.selectedSize}</p>
                                                    )}
                                                </div>
                                                <p className="font-black text-orange-600 whitespace-nowrap text-lg">৳{item.price * (item.quantity || 1)}</p>
                                            </div>
                                            <p className="text-sm font-bold text-orange-500 mt-1">Qty: x{item.quantity || 1}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 space-y-3">
                                <div className="flex justify-between font-bold text-gray-600">
                                    <span>Subtotal</span>
                                    <span>৳{subtotal}</span>
                                </div>
                                <div className="flex justify-between font-bold text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span>৳{deliveryFee}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-2xl font-black pt-4 border-t border-gray-200">
                                    <span>Total Amount</span>
                                    <span className="text-orange-600">৳{totalAmount}</span>
                                </div>
                            </div>

                            <div className="mt-6 bg-black/5 text-black p-3 rounded text-center text-sm font-bold tracking-wide uppercase">
                                ✓ Cash on Delivery
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
