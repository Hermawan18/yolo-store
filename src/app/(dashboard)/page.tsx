'use client';
import Banner from '@/app/(dashboard)/components/Banner';
import { FetchDataType, Product } from '@/types';
import { useEffect, useState } from 'react';
import { CardHome } from './components/CardHome';

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<Product[]>([]);

  const resultPagination = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products/pagination`, {
      method: 'POST',
      headers: {
        cookie: document.cookie,
      },
      cache: 'no-store',
      body: JSON.stringify({ page }),
    });

    const responseBody: FetchDataType = await response.json();
    console.log(responseBody, '<<< data dari home');

    if (!response.ok) {
      throw new Error('fetch error');
    }
    setItems([...items, ...responseBody?.data]);
    return responseBody;
  };

  useEffect(() => {
    resultPagination();
  }, []);

  return (
    <div>
      <Banner />
      <main className="text-center py-44 px-3">
        <h1 className="font-bold text-4xl mb-10">
          Selamat datang di <span className="bg-red-600 px-2 text-white rounded-lg">YOLO</span>
        </h1>
        <p className="text-2xl text-slate-800">
          Destinasi online pilihan Anda untuk gaya yang tak terbantahkan! Kami mengundang Anda untuk menjelajahi dunia fashion terbaru dengan koleksi pakaian eksklusif kami. Dengan perpaduan antara gaya yang trendi dan kualitas terbaik,
          FashionHub menjadi pilihan utama bagi para pecinta fashion yang menginginkan penampilan yang tak terlupakan.
        </p>
      </main>
      <div className="flex flex-wrap justify-around py-5">
        {items.map((el, i) => {
          return i <= 2 ? <CardHome key={i} product={el} /> : null;
        })}
      </div>
      <footer className="py-5">
        <h1 className="text-center text-3xl font-semibold">❤️ HAPPY SHOPING ❤️</h1>
      </footer>
    </div>
  );
}
