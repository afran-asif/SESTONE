import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();
        const products = await Product.find({}).sort({ createdAt: -1 });
        return NextResponse.json(products);
    } catch (error) {
        console.error("GET /api/products error:", error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, price, image, images, category, description, sizes, stock, inStock, adminEmail } = body;

        // Ensure process.env.ADMIN_EMAIL is set
        if (!process.env.ADMIN_EMAIL || adminEmail !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const product = await Product.create({
            title,
            price,
            image,
            images,
            category,
            description,
            sizes,
            stock,
            inStock
        });

        return NextResponse.json({ success: true, product }, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/products error:", error);
        return NextResponse.json({ error: error?.message || 'Failed to create product' }, { status: 500 });
    }
}
