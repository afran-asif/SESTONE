import Link from 'next/link'
import { products } from '@/lib/data';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function Home() {

  return (
    <main className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-500">
        PRODUCTS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between">
            <div>
              <img src={product.image} alt={product.title} className="h-48 w-full object-contain mb-4" />
              <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider mb-2">{product.category}</p>
              <h2 className="text-sm font-bold text-gray-700 truncate mb-2">{product.title}</h2>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-black text-gray-900">৳{product.price}</span>
              <Link href={`/product/${product.id}`}>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}