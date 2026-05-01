"use client"
import React from "react";
import { useState, useEffect } from "react";
import { Product } from "@/lib/data";
import Link from "next/link";
import AddToCart from "@/components/AddToCart";
import Image from 'next/image';
import myProductImage from '../../image.png';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const id = resolvedParams.id;
    
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                    setActiveImage(data.image);
                } else {
                    setError("Product not found");
                }
            } catch (err) {
                setError("Failed to fetch product");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product && product.sizes.length > 0) {
            setSelectedSize(product.sizes[0]);
        }
    }, [product])

    if (isLoading) {
        return <div className="text-center py-20 text-gray-500">Loading product...</div>;
    }

    if (!product || error) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">{error || "Product Not Found!"}</h1>
                <Link href="/shop" className="text-blue-500 underline" >Back to Shop</Link>
            </div>
        )
    }

    return (
        <div className="bg-gray-200 min-h-screen pb-20 ">
            <div className="max-w-6xl mx-auto p-6 mt-5 md:p-10 bg-gray-200 shadow-[0_10px_50px_rgba(0,0,0,0.05)] rounded-3xl flex flex-col md:flex-row gap-12 border-t-6 border-x-6 border-white">

                <div className="flex-1 space-y-6">
                    <div className="bg-[#f9f9f9] rounded-2xl overflow-hidden group cursor-zoom-in">
                        <img
                            src={activeImage}
                            alt={product.title}
                            className="w-full h-[500px] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    <div className="flex gap-3 justify-center">
                        {[product.image, product.image, product.image].map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(img)}
                                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-orange-500 scale-105 shadow-md' : 'border-gray-100 opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <img src={img} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 space-y-8 py-4">
                    <div className="space-y-2">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                            {product.category}
                        </p>
                        <h1 className="text-5xl font-black text-orange-600 leading-[0.9] tracking-tighter uppercase">
                            {product.title}
                        </h1>
                        <p className="text-3xl font-light text-zinc-800 pt-2 italic">
                            ৳{product.price}
                        </p>
                    </div>

                    <p className="text-zinc-500 text-sm leading-relaxed border-b pb-5 max-w-md ">
                        {product.description}
                    </p>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center max-w-[320px]">
                            <h3 className="font-bold text-xs uppercase tracking-widest text-orange-600">Select Size</h3>
                            {/* <button className="text-[10px] underline text-zinc-400 hover:text-orange-600 uppercase">Size Guide</button> */}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-14 h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${selectedSize === size
                                            ? "bg-black text-white border-black shadow-xl"
                                            : "bg-white text-zinc-800 border-zinc-200 hover:border-black"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-xs uppercase tracking-widest text-orange-600">Quantity</h3>
                        <div className="flex items-center border-2 border-zinc-900 w-fit rounded-full overflow-hidden">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-6 py-2 hover:bg-zinc-100 transition-colors text-red-400 text-xl">-</button>
                            <span className="px-4 py-2 font-black text-black text-lg border-x-2 border-zinc-900">{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="px-6 py-2 hover:bg-zinc-100 transition-colors text-red-400 text-xl">+</button>
                        </div>
                    </div>

                    <div className="pt-8">
                        <AddToCart product={{ ...product, selectedSize, quantity } as any} />
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center">
                <Link href="/shop" className="inline-block group">
                    <div className="flex flex-col items-center gap-2">
                        <div className="p-4 bg-zinc-100 rounded-full group-hover:bg-orange-500 transition-all duration-500 group-hover:-translate-y-2">
                            <Image className="opacity-70 group-hover:invert transition-all" alt="back" src={myProductImage} width={30} height={30} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 group-hover:text-black transition-colors">Return to Shop</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}