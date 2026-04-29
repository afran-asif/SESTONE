"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CancelOrderButtion({ orderId, initialStatus }: { orderId: string, initialStatus: string}) {
    const [ status, setStatus ] = useState(initialStatus);
    const [ loading, setLoading ] = useState(false);
    const router = useRouter();

    const handleCancel = async () => {
        if (!confirm("আপনি কি নিশ্চিত যে অর্ডারটি বাতিল করতে চান?")) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/orders?id=${orderId}`, { method: 'PATCH'});
            if (res.ok) {
                setStatus("Cancelled");
                alert("আপনার অর্ডারটি সফলভাবে বাতিল করা হয়েছে।");
                router.refresh();

            } else {
                const data = await res.json();
                alert(data.message || "বাতিল করা সম্ভব হয়নি।")
            }
        } catch ( error ) {
            alert("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।")
        } finally {
            setLoading(false);
        }
    }

if (status === "Cancelled") {
        return <p className="text-red-600 font-bold mt-4 italic">এই অর্ডারটি বাতিল করা হয়েছে।</p>;
    }

    if (status !== "Pending") return null;

    return (
        <button
            onClick={handleCancel}
            disabled={loading}
            className="mt-6 text-sm font-bold text-gray-400 hover:text-red-600 transition-colors uppercase tracking-tight"
        >
            {loading ? "Cancelling..." : "Cancel Order?"}
        </button>
    );
}