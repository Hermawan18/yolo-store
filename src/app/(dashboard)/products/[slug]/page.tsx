'use client';
import { AddWishlist } from './components/AddWishlist';
import type { Metadata } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FetchDataProduct, Product } from '@/types';
import { ObjectId } from 'mongodb';

export default function DetailProduct({ params: { slug } }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product>({
    _id: new ObjectId(),
    name: '',
    slug: '',
    description: '',
    excerpt: '',
    price: 0,
    tags: [],
    thumbnail: '',
    images: [],
  });

  async function getProductById() {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/products/' + slug, {
      method: 'GET',
      headers: {
        cookie: document.cookie,
      },
      cache: 'no-store',
    });

    const responseBody: FetchDataProduct = await response.json();

    setProduct(responseBody?.data);
  }

  const formatRupiah = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(product.price);

  const metadata: Metadata = {
    title: product.name,
    description: product.description,
  };

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <>
      <div className="h-screen px-3 mt-10 ">
        <div className=" flex">
          <figure className="" style={{ width: '800px' }}>
            <Image src={product?.thumbnail} alt="Shoes" width={800} height={800} priority />
          </figure>
          <div className="w-56 flex flex-col ms-2">
            {product?.images?.map((el, i) => {
              return (
                <figure key={i} className="w-full">
                  <Image src={el} alt="Shoes" width={200} height={200} priority />
                </figure>
              );
            })}
          </div>
          <div className="p-3">
            <h1 className="text-6xl font-bold">{product.name}</h1>
            <br />
            <h2 className="text-3xl font-semibold">{formatRupiah.split(',')[0]}</h2>
            <br />
            <p className="text-lg text-slate-600">{product.description}</p>
            <br />
            <p className="text-md text-slate-600 italic">{product.excerpt}</p>
            <AddWishlist product={product}>TAMBAH KRANJANG</AddWishlist>
          </div>
        </div>
      </div>
    </>
  );
}
