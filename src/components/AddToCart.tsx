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
        <button onClick={ handleAddToCart } className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-green-600 hover:text-white transition-all shadow-lg active:scale-95" >
            Add to Cart
        </button>
    );
};

export default AddToCart;