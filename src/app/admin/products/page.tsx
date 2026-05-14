"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useSession, signIn } from "next-auth/react";
import Link from 'next/link';

export default function AdminProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();

    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            if (Array.isArray(data)) {
                setProducts(data);
            }
        } catch (error) {
            console.error("Product Load Error:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
            fetchProducts();
        } else if (status !== "loading") {
            setLoading(false);
        }
    }, [status, session?.user?.email, fetchProducts]);

    if (status === "loading") return <p className="text-white text-center mt-10">Checking access...</p>;

    if (!session || session.user?.email !== "asifafran24@gmail.com") {
        return (
            <div className='flex flex-col items-center justify-center h-screen bg-black text-white'>
                <h1 className='text-2xl mb-4 font-bold text-orange-500'>SESTONE Admin Access Required</h1>
                <button
                    onClick={() => signIn("google")}
                    className='bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-orange-500 hover:text-white transition'
                >
                    Login with Google
                </button>
            </div>
        );
    }

    if (loading) return <p className="text-center mt-10 text-white italic">প্রোডাক্ট লোড হচ্ছে...</p>;

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        
        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchProducts(); // Refresh the list
            } else {
                alert("Failed to delete product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("An error occurred while deleting the product.");
        }
    };

    return (
        <div className="p-8 bg-zinc-950 min-h-screen text-white">
            <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-2">
                <h1 className="text-3xl font-bold">SESTONE - Manage Products</h1>
                <Link href="/admin/add-product" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition">
                    + Add New Product
                </Link>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-zinc-800">
                    <thead>
                        <tr className="bg-zinc-900">
                            <th className="p-4 border border-zinc-800 text-zinc-300">Image</th>
                            <th className="p-4 border border-zinc-800 text-zinc-300">Title & Category</th>
                            <th className="p-4 border border-zinc-800 text-zinc-300">Price & Stock</th>
                            <th className="p-4 border border-zinc-800 text-center text-zinc-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product: any) => (
                                <tr key={product._id} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition">
                                    <td className="p-4 align-middle">
                                        <div className="w-16 h-16 bg-white rounded overflow-hidden">
                                            <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                                        </div>
                                    </td>

                                    <td className="p-4 align-middle">
                                        <p className="text-white font-bold text-lg">{product.title}</p>
                                        <p className="text-xs text-orange-500 uppercase tracking-widest mt-1">{product.category}</p>
                                    </td>

                                    <td className="p-4 align-middle">
                                        <p className="text-white font-bold text-lg">৳{product.price}</p>
                                        <p className={`text-xs mt-1 font-bold ${product.stock > 0 && product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                                            {product.stock > 0 && product.inStock ? `In Stock (${product.stock})` : 'Out of Stock'}
                                        </p>
                                    </td>

                                    <td className="p-4 align-middle text-center">
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded font-bold uppercase text-xs hover:bg-red-500 hover:text-white transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-10 text-center text-zinc-500 italic border border-zinc-800">
                                    কোনো প্রোডাক্ট পাওয়া যায়নি।
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
