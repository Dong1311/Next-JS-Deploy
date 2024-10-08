import React from 'react';
import ProductForm from './ProductForm';

// Hàm fetch dữ liệu từ API
export default async function ProductsPage() {
    const res = await fetch('http://localhost:1337/api/products?populate=*');
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await res.json();

    return (
        <div>
            <ProductForm products={data.data} totalPages={data.meta.pagination.pageCount} />
        </div>
    );
}
