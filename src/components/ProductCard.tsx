import { Product } from "@/lib/data";
import Link from "next/link";
import Image from "next/image"; // Next.js Image use kora bhalo performance-er jonno

interface props {
    product: any; // Interface context-er sathe milate any ba specific type use koro
}

const ProductCard = ({ product }: props) => {
    // Stock check
    const isSoldOut = product.stock <= 0 || !product.inStock;

    return (
        <div className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
            
            {/* Image Section with Badge */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
                <img
                    src={product.image}
                    alt={product.title}
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${isSoldOut ? 'grayscale opacity-60' : ''}`}
                />
                
                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {isSoldOut ? (
                        <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                            Sold Out
                        </span>
                    ) : product.stock < 5 ? (
                        <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg animate-pulse">
                            Low Stock
                        </span>
                    ) : null}
                </div>

                {/* Quick View Overlay (Desktop Only) */}
                {!isSoldOut && (
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link href={`/product/${product._id || product.id}`} className="bg-white text-black px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                            View Shop
                        </Link>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-4 md:p-6 flex flex-col flex-grow">
                <div className="mb-auto">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em]">
                            {product.category}
                        </span>
                    </div>
                    
                    <h2 className="text-sm md:text-base font-black text-zinc-900 leading-tight mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                        {product.title}
                    </h2>
                </div>

                <div className="  border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        {/* <span className="text-xs text-gray-400 font-medium uppercase">Price</span> */}
                        <span className="text-lg font-black text-orange-500 italic">
                            ৳{product.price}
                        </span>
                    </div>

                    <Link href={`/product/${product._id || product.id}`}>
                        <button 
                            disabled={isSoldOut}
                            className={`p-3 rounded-full transition-all duration-300 ${
                                isSoldOut 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-zinc-900 text-white hover:bg-orange-500 hover:scale-110 shadow-md'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;