'use client';

import { FetchDataType, Product } from '@/types';

export function AddWishlist({ children, product }: { children: React.ReactNode; product: Product }) {
  const handleAddWishlist = async (product: Product) => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/wishlist', {
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({ productId: product._id }),
    });
    const responseBody: FetchDataType = await response.json();
    console.log(responseBody, '<<<< dari add wishlist');

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
