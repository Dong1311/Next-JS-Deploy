import React from 'react';
import EditProductForm from './EditProductForm';

//  fetch danh sách sản phẩm và tạo ra các route tĩnh
export async function generateStaticParams() {
    const res = await fetch('http://localhost:1337/api/products');
    const products = await res.json();
    console.log("product:",products);
    return products.data.map((product) => ({
        id: product.id.toString(),
        
    }));
    
}

//fetch dữ liệu cho từng sản phẩm
export default async function EditProductPage({ params }) {
    const { id } = params; 

    const res = await fetch(`http://localhost:1337/api/products/${id}?populate=*`, { next: { revalidate: 10 } });
    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }
    else{
        console.log("Fetch product data successfully!")
    }

    const product = await res.json();
    // console.log("Product data: ", product)

    return <EditProductForm product={product.data} />;
}
