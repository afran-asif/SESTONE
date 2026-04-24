import { Product } from "@/lib/data";
import Link from "next/link";

interface props {
    product: Product;
}

const ProductCard = ({ product }: props) => {
    return (
        <div key={product.id} className="bg-white p-3 md:p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between h-full">
            <div>
                <div className="h-32 md:h-48 w-full bg-gray-50 rounded-xl overflow-hidden mb-3">
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="h-full w-full object-contain hover:scale-105 transition-transform duration-500" 
                    />
                </div>
                
                <p className="text-[10px] md:text-xs text-blue-500 font-bold uppercase tracking-wider mb-1">
                    {product.category}
                </p>
                
                <h2 className="text-xs md:text-sm font-black text-gray-700 line-clamp-2 min-h-[25px] md:min-h-[40px] leading-tight">
                    {product.title}
                </h2>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <span className="text-sm md:text-lg font-black text-gray-800">
                    ৳{product.price}
                </span>
                
                <Link href={`/product/${product.id}`} className="w-full md:w-auto">
                    <button className="w-full bg-orange-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg text-[10px] md:text-sm font-bold hover:bg-gray-800 transition active:scale-95 uppercase">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;