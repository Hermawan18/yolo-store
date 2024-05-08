'use client';

import { FetchDataType, Product } from '@/types';

export function AddWishlist({ children, product }: { children: React.ReactNode; product: Product }) {
  const handleAddWishlist = async (product: Product) => {
    const response = await fetch('http://localhost:3000/api/wishlist', {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({ productId: product._id }),
    });
    const responseBody: FetchDataType = await response.json();

    if (!response.ok) {
      throw new Error('fetch error dari add wishlist');
    }
    return responseBody;
  };
  return (
    <>
      <button className="btn btn-primary my-5" onClick={() => handleAddWishlist(product)}>
        {children}
      </button>
    </>
  );
}
