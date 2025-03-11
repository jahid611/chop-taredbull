import React from 'react';
import ProductList from '../components/ProductList';

export default function Products() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-8">
        <ProductList />
      </main>
    </div>
  );
}

