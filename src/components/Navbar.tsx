"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
const Navbar = () => {

    const { cart, setIsCartOpen } = useCart();
    const pathname = usePathname();
    const activeStyle = "text-orange-600 font-bold border-b-2 border-orange-600 pb-1";
    const inactiveStyle = "text-gray-500 hover:text-blue-600 transition";
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
                    <Link 
                        href="/" 
                        className={pathname === "/" ? activeStyle : inactiveStyle}
                    >
                        Home
                    </Link>

                    <Link 
                        href="/shop" 
                        className={pathname === "/shop" ? activeStyle : inactiveStyle}
                    >
                        Shop
                    </Link>

                    <Link 
                        href="/about" 
                        className={pathname === "/about" ? activeStyle : inactiveStyle}
                    >
                        About
                    </Link>
                    </div>
                </div>

                {/* Cart Icon (Dummy) */}
                <div className="flex items-center gap-4" onClick={() => setIsCartOpen(true)}>
                <div className="relative cursor-pointer">
                    <span className="text-xl">🛒</span>
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
                    </span>
                </div>
                </div>
            </div>
            </div>
        </nav>
    )
}

export default Navbar;