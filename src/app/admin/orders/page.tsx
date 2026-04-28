"use client";
import React, { useEffect, useState } from 'react';

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders');
                const data = await response.json();
                setOrders(data);

                if (Array.isArray(data)) {
                    setOrders(data);
                }
            } catch (error) {
                console.error("Order লোড করতে সমস্যা হয়েছে:", error);
                setOrders([])
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <p className="text-center mt-10 text-white">অর্ডার লোড হচ্ছে...</p>;

    return (
        <div className="p-8 bg-zinc-950 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6 border-b border-zinc-800 pb-2">SESTONE - Admin Panel</h1>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-900">
                            <th className="p-4 border border-zinc-800">Customer Name</th>
                            <th className="p-4 border border-zinc-800">Address</th>
                            <th className="p-4 border border-zinc-800">Items</th>
                            <th className="p-4 border border-zinc-800">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? (
                            orders.map((order: any) => (
                                <tr key={order._id} className="border-b border-zinc-800 hover:bg-zinc-900/50 transition">
                                    
                                    <td className="p-4 align-top font-medium">{order.fullName}</td>
                                    
                                    <td className="p-4 align-top text-zinc-400">
                                        <p>{order.phone}</p>
                                        <p className="text-xs">{order.address}</p>
                                    </td>

                                    <td className="p-4 align-top">
                                        {order.cartItems?.map((item: any, idx: number) => (
                                            <div key={idx} className="text-sm bg-zinc-800/50 px-2 py-1 rounded mb-1 inline-block mr-1">
                                                {item.title} <span className="text-orange-400">({item.selectedSize})</span> x {item.quantity}
                                            </div>
                                        ))}
                                    </td>

                                    <td className="p-4 align-top text-right font-bold text-orange-500">
                                        ৳{order.totalAmount}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-10 text-center text-zinc-500 italic">
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