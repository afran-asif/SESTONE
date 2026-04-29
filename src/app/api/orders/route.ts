import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

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

        const newOrder = await Order.create(data);

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
