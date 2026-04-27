import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import Link from "next/link";
import { notFound } from "next/navigation";

// Define interface for the expected params
interface PageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function ThankYouPage({ params }: PageProps) {
  const { orderId } = await params;
  
  await dbConnect();
  
  let order;
  try {
    order = await Order.findById(orderId);
  } catch (error) {
    // If orderId is not a valid ObjectId, it will throw an error
    return notFound();
  }

  if (!order) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-10">
      <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 text-center relative overflow-hidden">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl text-black font-black uppercase italic mb-4">Thank You!</h1>
        <p className="text-gray-600 text-lg mb-8 font-medium">
          আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
        </p>

        <div className="bg-gray-50 text-left p-6 mb-8">
          <h2 className="text-xl text-black font-bold uppercase mb-4 border-b border-gray-200 pb-2">Order Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-500 font-bold mb-1">ORDER ID</p>
              <p className="font-bold text-black">{order._id.toString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold mb-1">DATE</p>
              <p className="font-bold text-black">{new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold mb-1">CUSTOMER</p>
              <p className="font-bold text-black">{order.fullName}</p>
              <p className="text-gray-600 text-sm mt-1">{order.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold mb-1">DELIVERY ADDRESS</p>
              <p className="font-bold text-black text-sm leading-relaxed">{order.address}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm text-gray-500 font-bold mb-3 uppercase">Items Ordered</h3>
            <div className="space-y-3 mb-6">
              {order.cartItems.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center bg-white p-3 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <div className="w-12 h-12 bg-gray-50 flex-shrink-0 flex items-center justify-center p-1">
                        <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-sm text-gray-900 line-clamp-1">{item.title}</p>
                      <div className="flex gap-3 mt-0.5">
                        <p className="text-xs text-gray-500 font-bold">Qty: {item.quantity}</p>
                        {item.selectedSize && (
                          <p className="text-xs text-gray-500 font-bold">Size: {item.selectedSize}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-orange-600">৳{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between font-bold text-gray-600">
                <span>Subtotal</span>
                <span>৳{order.subtotal}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-600">
                <span>Delivery Fee</span>
                <span>৳{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-black text-xl font-black pt-3 border-t border-gray-200 mt-3">
                <span>Total Amount</span>
                <span className="text-orange-600">৳{order.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        <Link 
          href="/" 
          className="inline-block bg-black text-white font-bold tracking-widest uppercase px-8 py-4 hover:scale-[1.02] transition-transform duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
