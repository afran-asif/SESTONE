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
        category: "Mens Clothing",
        description: "Premium oversized drop shoulder t-shirt made with heavy cotton for a stylish streetwear look."
    },
    {
        id: 2,
        title: "LEHENGA",
        price: 550,
        image: "https://static3.azafashions.com/tr:w-450/uploads/product_gallery/1768052585362_2.jpg",
        category: "Womens Clothing",
        description: "Mint Viscose Georgette, Silk Sequins, Amaira Lehenga Saree With Blouse."
    },
    {
        id: 3,
        title: "BAN COLLER SHIRT",
        price: 550,
        image: "https://static-01.daraz.com.bd/p/c8dfbed4dab1e72faf9c1927f961e6ac.jpg",
        category: "Mens Clothing",
        description: "Men's Solid Colour Shirt Fabrics: Oxford Cotton Size: M, L,XL Made in Bangladesh Measurement: M=Chest-38, Length-28 L=Chest-40, Length-29 XL=Chest-42, Length-30 XxL=Chest-44, Length-31"
    },
    {
        id: 4,
        title: "THREE PEICE",
        price: 550,
        image: "https://flickere.com.bd/public/uploads/all/sIFCuVnuLUsHlai45h4DU0h9DxPY0MvbbtdV4ZzV.webp",
        category: "Womens Clothing",
        description: "Flickere Outfit Alizeh Light Orange Silk 3 Piece Salwar Kameez Set with Sequins & Karchupi Embroidery."
    },
    
    {
        id: 5,
        title: "OLD MONEY POLO",
        price: 650,
        image: "https://designerland.com.bd/wp-content/uploads/2024/10/449315849_455361160586999_2753060102660879284_n-1.jpg",
        category: "Mens Clothing",
        description: "Classic old money aesthetic polo shirt. Sophisticated look with a comfortable woolen structure."
    },
    {
        id: 6,
        title: "SHAREE",
        price: 550,
        image: "https://mcprod.aarong.com//media/catalog/product/0/5/0560000082680.jpg",
        category: "Womens Clothing",
        description: "Sage grey printed silk saree with Nakshi Kantha embroidery. Comes with matching unstitched blouse piece attached at the end of saree. Blouse shown in the photo is a styling suggestion, it is not a part of the actual product."
    }
];