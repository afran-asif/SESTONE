import { Product } from "@/types";

interface props {
    product: Product;
}

const ProductCard = ({ product }: props )=> {
    return(
        <div>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.price}</p>
            <button>Add to Cart</button>
        </div>
    );
};

export default ProductCard;