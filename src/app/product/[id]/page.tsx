import { products } from "@/lib/data";
import Link from "next/link";
import AddToCart from "@/components/AddToCart";

export default async function ProductDetail({ params } : { params: { id: string }}) {
    const { id } = await params;

    const product = products.find((p) => p.id === parseInt(id));

    if (!product){
        return (
            <div>
                <h1 className="text-2xl font-bold">Product Not Found!</h1>
                <Link href="/" className=" text-blue-500 underline" >Back to Home</Link>
            </div>
        )
    }

    return (
    <div className="max-w-5xl mx-auto p-10 mt-10 bg-white shadow-xl rounded-2xl flex flex-col md:flex-row gap-10 border border-gray-100">
    <div className="flex-1">
        <img src={product.image} alt={product.title} className="w-full h-96 object-contain" />
    </div>
    <div className="flex-1 space-y-6">
        <div>
            <p className="text-sm text-blue-600 font-bold uppercase tracking-widest">{product.category}</p>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{product.title}</h1>
        </div>
            <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            <p className="text-5xl font-black text-gray-900">৳{product.price}</p>
        <div className="pt-6">
        
            <AddToCart product={product}/>

        </div>
    </div>
    </div>
);
}