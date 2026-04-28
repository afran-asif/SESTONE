import Link from "next/link";
import Image from 'next/image';
export default function HomePage() {
  return (
    <div className="bg-gray-200 min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
        
        {/*Branding & CTA*/}
        <div className="z-10 text-center md:text-left">
          <span className="text-black/80 font-bold tracking-[0.2em] uppercase text-sm mb-4 mt-5 block">
            New Collection 2026
          </span>
          <h1 className="text-7xl md:text-9xl font-black text text-gray-500 uppercase leading-[0.8] tracking-tighter italic">
            SES<div className="flex justify-center"><div className="text-orange-400">T</div>ONE</div>
          </h1>
          <p className="text-black text-lg md:text-xl flex justify-center mt-6 mb-5 max-w-md opacity-90 leading-relaxed">
            Experience the fusion of tradition and streetwear. Premium quality, crafted for the bold.
          </p>
          <div className="mt-5 animate-bounce px-25">
            <span className="text-black text-5xl">↓</span>
          </div>
          <Link href="/shop">
            <button className="group relative bg-orange-400 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest overflow-hidden transition-all shadow-2xl active:scale-95">
              <span className="relative z-10">Explore Shop</span>
              <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </Link>
        </div>

        <div className="relative h-[500px] md:h-[700px] flex justify-center items-end">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <h2 className="text-[15rem] font-black text-orange rotate-90">2026</h2>
          </div>

          <Image 
            src="/2.jpeg"
            alt="Sestone Premium Wear"
            className="relative hight-auto z-10 h-full w-full object-contain mb-5 drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-700"
            width={500} height={500}
            priority
          />
        </div>

      </div>
    </div>
  );
}