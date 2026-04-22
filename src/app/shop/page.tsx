"use client"
import { useState } from "react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
    const [ selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts = selectedCategory === "All"
    ? products 
    : products.filter(p => p.category === selectedCategory);

    const categories = ["All","Mens Clothing","Womens Clothing"];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black tracking-tighter mb-4 uppercase">Sestone collection</h1>
                <p className="text-gray-500">Discover your style from our premium streetwear and outfits.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} 
                    className={`px-8 py-2.5 rounded-full border text-sm font-bold transition-all duration-300 ${ 
                        selectedCategory === cat
                        ? "bg-black text-white border-black shadow-lg"
                        : "bg-white text-black border-gray-200 hover:border-black"
                        }`}>
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ):(
                <div className="text-center py-20">
                    <p className="text-gray-400 italic">No products found in this category.</p>
                </div>
            )}
        </div>
    )
}