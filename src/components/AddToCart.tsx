"use client"
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/data"

const AddToCart = ({product} : {product : Product}) => {
    const  { addToCart } = useCart();

    return(
        <button onClick={ () => addToCart(product) } className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95" >
            Add to Bag
        </button>
    );
};

export default AddToCart;