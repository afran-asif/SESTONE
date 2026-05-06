import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/models/Product";
import ShopClient from "./ShopClient";

export const revalidate = 60; // Revalidate the page every 60 seconds for fast performance

export default async function ShopPage() {
    await dbConnect();
    // Fetch products directly from the database to avoid client-side loading
    const rawProducts = await ProductModel.find({}).sort({ createdAt: -1 }).lean();
    
    // Parse it through JSON to safely serialize Mongoose ObjectIds and Dates to pass to Client Component
    const products = JSON.parse(JSON.stringify(rawProducts));

    return <ShopClient initialProducts={products} />;
}