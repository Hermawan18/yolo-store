'use client';
import Banner from '@/app/(dashboard)/components/Banner';
import { FetchDataType, FetchDataProducts, Product } from '@/types';
import { useEffect, useState } from 'react';
import { CardHome } from './components/CardHome';

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<Product[]>([]);

  const resultPagination = async () => {
    const response = await fetch(`http://localhost:3000/api/products/pagination`, {
      method: 'POST',
      headers: {
        cookie: document.cookie,
      },
      cache: 'no-store',
      body: JSON.stringify({ page }),
    });

    const responseBody: FetchDataProducts = await response.json();
    console.log(responseBody);

    if (!response.ok) {
      throw new Error('fetch error');
    }
    setItems([...items, ...responseBody?.data?.data]);
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
          Selamat datang di{' '}
          <span>
            <svg className="m-auto mt-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 40" width="200" height="100" role="img" aria-label="ユニクロ｜UNIQLO">
              <title>ユニクロ｜UNIQLO</title>
              <path fill="red" d="M50 0h40v40H50zM0 0h40v40H0z"></path>
              <g fill="#fff">
                <path d="M79.48 5.47h2.53v12.64h-2.53zM63.47 13.9a4.21 4.21 0 0 1-8.42 0V5.47h2.53v8.43a1.68 1.68 0 1 0 3.36 0V5.47h2.53zM75.26 34.53h-8.42V21.89h2.53V32h5.89v2.53zM75.26 18.11h-2.53l-3.36-7.22v7.22h-2.53V5.47h2.53l3.36 7.22V5.47h2.53v12.64zM59.26 21.89a4.21 4.21 0 0 0-4.21 4.22v4.21a4.21 4.21 0 0 0 4.21 4.21 4.34 4.34 0 0 0 .82-.07l.86 2.6h2.53l-1.25-3.75a4.2 4.2 0 0 0 1.25-3v-4.2a4.21 4.21 0 0 0-4.21-4.22m1.68 8.43a1.68 1.68 0 1 1-3.36 0v-4.21a1.68 1.68 0 1 1 3.36 0zM80.74 21.89a4.22 4.22 0 0 0-4.22 4.22v4.21a4.21 4.21 0 0 0 8.42 0v-4.21a4.21 4.21 0 0 0-4.21-4.22m1.68 8.43a1.68 1.68 0 0 1-3.37 0v-4.21a1.68 1.68 0 0 1 3.37 0z"></path>
                <g>
                  <path d="M22.74 15.16H34.1v2.52H22.74zM24 5.47h8.84V8H24zM14.74 5.47H7.15V8h5.06v7.16H5.9v2.52h11.36v-2.52h-2.52V5.47zM22.74 22.31v12.22H34.1V22.31zM31.57 32h-6.31v-7.16h6.31zM7.15 22.31l-1.28 6.12h2.52l.76-3.59h5.07L12.73 32H5.14l-.51 2.53h10.11l2.52-12.22H7.15z"></path>
                </g>
              </g>
            </svg>
          </span>
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
