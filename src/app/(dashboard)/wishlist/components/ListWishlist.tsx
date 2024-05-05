'use client';

import { FetchDataType, FetchDataTypeWishlist, Product, Wishlist } from '@/types';
import { useEffect, useState } from 'react';
import CardProduct from '../../products/components/CardProduct';
import CardWishlist from './CardWishlist';

export function ListWishlist() {
  const [productWishlist, setProductWishlist] = useState<Wishlist[]>([]);

  async function fetchWishlist() {
    const response = await fetch('http://localhost:3000/api/wishlist', {
      method: 'GET',
      headers: {
        cookie: document.cookie,
      },
      cache: 'no-store',
    });

    const responseBody: FetchDataTypeWishlist = await response.json();

    setProductWishlist(responseBody?.data);
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="h-screen">
      <h1 className="text-center font-bold text-4xl">WISHLIST</h1>
      <div className="flex flex-row mt-5">
        {productWishlist?.map((el, i) => {
          return <CardWishlist key={i} wishlist={el} fetchWishlist={fetchWishlist} productWishlist={productWishlist} />;
        })}
      </div>

      <table className="table-auto">
        <thead>
          <tr>No</tr>
          <tr>Name</tr>
          <tr>Price</tr>
          <tr>Options</tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}
