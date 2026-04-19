export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

export const products: Product[] = [
    {
        id: 1,
        title: "DROP SHOULDER",
        price: 550,
        image: "https://gorurghash.com/wp-content/uploads/2024/09/Oversized-Drop-Shoulder-Solid-T-shirt-in-Ash-16.jpg",
        category: "Clothing",
        description: "Premium oversized drop shoulder t-shirt made with heavy cotton for a stylish streetwear look."
    },
    {
        id: 2,
        title: "OLD MONEY POLO",
        price: 650,
        image: "https://designerland.com.bd/wp-content/uploads/2024/10/449315849_455361160586999_2753060102660879284_n-1.jpg",
        category: "Clothing",
        description: "Classic old money aesthetic polo shirt. Sophisticated look with a comfortable woolen structure."
    },
    {
        id: 3,
        title: "BAN COLLER SHIRT",
        price: 550,
        image: "https://static-01.daraz.com.bd/p/c8dfbed4dab1e72faf9c1927f961e6ac.jpg",
        category: "Clothing",
        description: "Men's Solid Colour Shirt Fabrics: Oxford Cotton Size: M, L,XL Made in Bangladesh Measurement: M=Chest-38, Length-28 L=Chest-40, Length-29 XL=Chest-42, Length-30 XxL=Chest-44, Length-31"
    }
];