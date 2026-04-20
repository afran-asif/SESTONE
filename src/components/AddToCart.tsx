"use client"
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/data"
import toast from "react-hot-toast";
const AddToCart = ({product} : {product : Product}) => {
    const  { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.title} added to bag!`,{
            style:{
                border: '1px solid #000',
                padding: '16px',
                color: '#000',
            },
            iconTheme: {
                primary: '#000',
                secondary: '#fff',
            }
        })
    }
    return(
        <button onClick={ handleAddToCart } className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95" >
            Add to Bag
        </button>
    );
};

export default AddToCart;