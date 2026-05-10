"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";

export default function AddProductPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        image: "",
        images: [] as string[],
        category: "",
        description: "",
        sizes: ["S", "M", "L", "XL", "XXL"], // Default sizes
        stock: "10",
        inStock: true,
        adminEmail: ""
    });

    const categories = ["Mens Clothing", "Womens Clothing", "Gadgets", "Accessories"];
    const availableSizes = ["S", "M", "L", "XL", "XXL", "39", "40", "41", "42", "43", "44"];

    const handleRemoveImage = (index: number) => {
        setFormData(prev => {
            const newImages = prev.images.filter((_, i) => i !== index);
            return {
                ...prev,
                images: newImages,
                image: newImages.length > 0 ? newImages[0] : ""
            };
        });
    };

    const handleSizeToggle = (size: string) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.image) {
            setMessage({ text: "Please upload at least one image before creating the product.", type: "error" });
            return;
        }

        setIsLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    images: formData.images.filter(img => img.trim() !== ""),
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock) || 0
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ text: "Product added successfully!", type: "success" });
                setFormData(prev => ({
                    ...prev,
                    title: "",
                    price: "",
                    image: "",
                    images: [],
                    description: "",
                    stock: "10"
                }));
            } else {
                setMessage({ text: data.error || "Failed to add product.", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "An error occurred. Please try again.", type: "error" });
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-white mb-2">
                        Add <span className="text-orange-500">Product</span>
                    </h1>
                    <p className="text-zinc-400 text-sm">Create a new product in the SESTONE catalog</p>
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Title</label>
                            <input
                                required
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. DROP SHOULDER"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Price (৳)</label>
                            <input
                                required
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g. 550"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Product Images</label>
                        
                        {formData.images.length > 0 && (
                            <div className="flex flex-wrap gap-4 mb-4">
                                {formData.images.map((img, index) => (
                                    <div key={index} className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-zinc-700">
                                        <img src={img} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </button>
                                        {index === 0 && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-orange-500 text-white text-[9px] font-bold text-center py-0.5">MAIN</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                const urls = res.map((file) => file.url);
                                setFormData(prev => {
                                    const newImages = [...prev.images, ...urls];
                                    return {
                                        ...prev,
                                        images: newImages,
                                        image: newImages.length > 0 ? newImages[0] : prev.image
                                    };
                                });
                                setMessage({ text: "Images uploaded successfully!", type: "success" });
                            }}
                            onUploadError={(error: Error) => {
                                setMessage({ text: `Upload Error: ${error.message}`, type: "error" });
                            }}
                            className="bg-zinc-800 border-2 border-dashed border-zinc-700 rounded-xl p-8 hover:border-orange-500 transition-colors ut-button:bg-orange-500 ut-button:ut-readying:bg-orange-500/50 ut-label:text-orange-500 ut-allowed-content:text-zinc-400"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Category</label>
                            <select
                                required
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all appearance-none"
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2 flex flex-col justify-end">
                            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Stock Quantity</label>
                            <input
                                required
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="e.g. 50"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                            />
                            
                            <label className="flex items-center gap-3 cursor-pointer py-2 mt-2">
                                <input
                                    type="checkbox"
                                    name="inStock"
                                    checked={formData.inStock}
                                    onChange={handleChange}
                                    className="w-5 h-5 bg-zinc-800 border-zinc-700 rounded text-orange-500 focus:ring-orange-500 focus:ring-offset-zinc-900 cursor-pointer"
                                />
                                <span className="text-sm font-bold uppercase tracking-wider text-zinc-300">Product in Stock</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Description</label>
                        <textarea
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter product description..."
                            rows={4}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                        ></textarea>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Available Sizes</label>
                        <div className="flex flex-wrap gap-2">
                            {availableSizes.map((size) => (
                                <button
                                    type="button"
                                    key={size}
                                    onClick={() => handleSizeToggle(size)}
                                    className={`w-12 h-10 rounded-lg border text-xs font-bold transition-all duration-300 ${formData.sizes.includes(size)
                                        ? "bg-orange-500 text-white border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                                        : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-zinc-800">
                        <div className="space-y-2 mb-6">
                            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Admin Authentication</label>
                            <input
                                required
                                type="email"
                                name="adminEmail"
                                value={formData.adminEmail}
                                onChange={handleChange}
                                placeholder="Enter admin email to authorize"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-orange-500 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-orange-600 active:scale-[0.98] shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
                                }`}
                        >
                            {isLoading ? "Creating Product..." : "Create Product"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
