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
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-6xl md:text-8xl font-black text-white uppercase mb-4 tracking-tighter">
        SESTONE
      </h1>
      <p className="text-white text-lg md:text-xl mb-8 opacity-90">
        Welcome to Premium Streetwear & Lifestyle.
      </p>

      <div className='mt-12 animate-bounce px-25 bold'>
        <span className='text-white text-2xl'>↓</span>
      </div>

      <Link href="/shop">
      <button className="bg-black text-white px-10 py-10 rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-2xl active:scale-95">
        Explore Shop
      </button>
      </Link>

      
    </div>
  );
}