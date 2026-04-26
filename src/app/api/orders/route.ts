import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST (req : Request) {
    try {
        await dbConnect();
        const data = await req.json();

        const newOrder = await Order.create(data);

        return NextResponse.json({ success: true, orderId: newOrder._id }, { status: 201 });
    } catch ( error : any ) {
        return NextResponse.json({ success: false, error: error.message },{ status: 500 })
    }
}