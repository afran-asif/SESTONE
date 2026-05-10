"use client"
import { useCart, CartItem } from "@/context/CartContext";
import toast from "react-hot-toast";

const AddToCart = ({product, disabled} : {product : CartItem, disabled?: boolean}) => {
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
        <button disabled={disabled} onClick={ handleAddToCart } className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg uppercase tracking-widest text-sm ${disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300' : 'bg-white text-black border border-black hover:bg-green-600 hover:text-white hover:border-green-600 active:scale-95'}`} >
            {disabled ? 'Sold Out' : 'Add to Cart'}
        </button>
    );
};

export default AddToCart;