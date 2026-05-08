import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Product from "@/models/Product";

export async function GET() {
    try {

        const session = await getServerSession();
        if(!session || session.user?.email !== process.env.ADMIN_EMAIL ){
            return NextResponse.json(
                { success: false, message:"Unauthorized Access! আপনি এডমিন নন।"},
                { status: 401 }
            )
        }
        await dbConnect();

        const orders = await Order.find({}).sort({ createdAt : -1});
        return NextResponse.json(orders, { status: 200 })
    } catch ( error: any ) {
        return NextResponse.json({ success: false, error: error.message },{ status: 500 })
    }
}
export async function POST(req: Request) {
    try {
        await dbConnect();
        const data = await req.json();
        const { cartItems } = data;

        for(const item of cartItems ) {
            const product = await Product.findById(item._id || item.id);
            if (!product || product.stock <(item.quantity || 1)) {
                return NextResponse.json({
                    success: false,
                    message: `${product?.title || "প্রোডাক্ট"} স্টকে নেই।`
                },{ status: 400 });
            }
        }

        const newOrder = await Order.create(data);

        for (const item of cartItems) {
            const productId = item._id || item.id;
            const quantityPurchased = item.quantity || 1;

            await Product.findByIdAndUpdate(productId, {
                $inc: { stock: -quantityPurchased }
            });

            const updatedProduct = await Product.findById(productId);
            if(updatedProduct && updatedProduct.stock <= 0) {
                await Product.findByIdAndUpdate(productId,{
                    stock: 0,
                    inStock: false
                })
            }
        }

        return NextResponse.json({ success: true, orderId: newOrder._id }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

export async function PATCH(req: Request) {
    try{
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const session = await getServerSession();

        if (!id) return NextResponse.json({ message: "ID missing"}, { status: 400});

        const order = await Order.findById(id);
        if (!order) return NextResponse.json({ message: "Order not found"}, { status: 404});

        const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL || session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

        if(!isAdmin && order.status !== "Pending"){
            return NextResponse.json({ message: "Only pending orders can be cancelled"}, { status: 400 });
        } 

        order.status = "Cancelled";
        await order.save();

        return NextResponse.json({ success: true, message: "Order Cancelled Successfully"})
    } catch ( error: any){
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
