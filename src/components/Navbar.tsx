"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const Navbar = () => {

    const { cart, setIsCartOpen } = useCart();
    return(
        <nav className="bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-black tracking-tighter text-black">
                    SESTONE
                </Link>
                </div>
                {/* Navigation Links */}
                <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8 font-medium">
                    <Link href="/" className="text-gray-500 hover:text-blue-600 transition">Home</Link>
                    <Link href="/shop" className="text-gray-500 hover:text-blue-600 transition">Shop</Link>
                    <Link href="/about" className="text-gray-500 hover:text-blue-600 transition">About</Link>
                </div>
                </div>

                {/* Cart Icon (Dummy) */}
                <div className="flex items-center gap-4" onClick={() => setIsCartOpen(true)}>
                <div className="relative cursor-pointer">
                    <span className="text-xl">🛒</span>
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {cart.length}
                    </span>
                </div>
                </div>
            </div>
            </div>
        </nav>
    )
}

export default Navbar;