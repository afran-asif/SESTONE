import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();
        
        let query = {};
        if (id.length === 24) {
            query = { _id: id };
        } else {
            return NextResponse.json({ error: 'Invalid product ID format' }, { status: 400 });
        }

        const product = await Product.findOne(query);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("GET /api/products/[id] error:", error);
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}
