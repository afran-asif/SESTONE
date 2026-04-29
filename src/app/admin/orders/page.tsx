"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useSession, signIn } from "next-auth/react";

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();

    const fetchOrders = useCallback(async () => {
        try {
            const response = await fetch('/api/orders');
            const data = await response.json();
            if (Array.isArray(data)) {
                setOrders(data);
            }
        } catch (error) {
            console.error("Order Load Error:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
            fetchOrders();
        } else if (status !== "loading") {
            setLoading(false);
        }
    }, [status, session?.user?.email, fetchOrders]);

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

    if (loading) return <p className="text-center mt-10 text-white italic">অর্ডার লোড হচ্ছে...</p>;

    return (
        <div className="p-8 bg-zinc-950 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6 border-b border-zinc-800 pb-2">SESTONE - Admin Panel</h1>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-zinc-800">
                    <thead>
                        <tr className="bg-zinc-900">
                            <th className="p-4 border border-zinc-800 text-zinc-300">Customer Name</th>
                            <th className="p-4 border border-zinc-800 text-zinc-300">Address & Phone</th>
                            <th className="p-4 border border-zinc-800 text-zinc-300">Items Ordered</th>
                            <th className="p-4 border border-zinc-800 text-right text-zinc-300">Total Bill</th>
                            <th className="p-4 border border-zinc-800 text-center text-zinc-300">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order: any) => (
                                <tr key={order._id} className={`border-b border-zinc-800 hover:bg-zinc-900/50 transition ${order.status === 'Cancelled' ? 'opacity-50' : ''}`}>
                                    <td className="p-4 align-top font-semibold text-orange-100">{order.fullName}</td>

                                    <td className="p-4 align-top text-zinc-400">
                                        <p className="text-white font-medium">{order.phone}</p>
                                        <p className="text-xs leading-relaxed">{order.address}</p>
                                    </td>

                                    <td className="p-4 align-top">
                                        {order.cartItems?.map((item: any, idx: number) => (
                                            <div key={idx} className="text-xs bg-zinc-800 border border-zinc-700 px-2 py-1 rounded mb-1 inline-block mr-1">
                                                {item.title} <span className="text-orange-400">({item.selectedSize})</span> x {item.quantity}
                                            </div>
                                        ))}
                                    </td>

                                    <td className="p-4 align-top text-right font-bold text-orange-500 text-lg">
                                        ৳{order.totalAmount}
                                    </td>
                                    <td className="p-4 align-top text-center">
                                        {order.status === "Cancelled" ? (
                                            <span className="text-red-500 font-bold text-sm bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">Cancelled</span>
                                        ) : (
                                            <div className="flex flex-col gap-2 items-center">
                                                <span className="text-green-500 font-bold text-sm bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">{order.status || "Pending"}</span>
                                                <button
                                                    onClick={async () => {
                                                        if (!confirm("Are you sure you want to cancel this order?")) return;
                                                        const res = await fetch(`/api/orders?id=${order._id}`, { method: 'PATCH' });
                                                        if (res.ok) fetchOrders();
                                                    }}
                                                    className="text-xs text-zinc-400 hover:text-red-500 transition-colors uppercase font-bold"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-10 text-center text-zinc-500 italic border border-zinc-800">
                                    এখনো কোনো অর্ডার পাওয়া যায়নি।
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}