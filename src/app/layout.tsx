import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { Toaster } from "react-hot-toast";
import ShopPage from "./shop/page";
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "SESTONE | Premium Streetwear",
  description: "Shop the best oversized t-shirts and streetwear at SESTONE.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col antialiased bg-gray-200 text-gray-900`}
      >

        <div className="min-h-screen bg-gray-200">
          <CartProvider>
            <Navbar />
            {/* <ShopPage /> */}
            <CartDrawer />
            <Toaster position="top-center" reverseOrder={false} />
            {children}

          </CartProvider>
        </div>

        {/* Simple Footer */}
        <footer className="bg-white border-t py-10 mt-10 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} SESTONE. Built with Passion.
          </p>
        </footer>
      </body>
    </html>
  );
}
