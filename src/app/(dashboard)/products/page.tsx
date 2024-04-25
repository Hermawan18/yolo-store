'use client';

import CardProduct from './components/CardProduct';
import { FetchDataType, Product, Wishlist } from '@/types';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Products() {
  const [products, setProducts] = useState<FetchDataType>();
  const [items, setItems] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  // get result search
  const searchProducts = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get('search');
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/products', {
      method: 'POST',
      headers: {
        cookie: document.cookie,
      },
      cache: 'no-store',
      body: JSON.stringify({ search }),
    });

    const responseBody = await response.json();

    setItems(responseBody?.data);

    return responseBody;
  };

  // result pagination
  const resultPagination = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products/pagination`, {
      method: 'POST',
      headers: {
        cookie: document.cookie,
      },
      body: JSON.stringify({ page }),
    });

    const responseBody: FetchDataType = await response.json();

    if (!response.ok) {
      throw new Error('fetch error');
    }

    setItems([...items, ...responseBody?.data]);
    setHasMore(true);
    return responseBody;
  };

  function handleMore() {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    resultPagination();
  }, [page]);

  return (
    <>
      <form onSubmit={searchProducts}>
        <div className="flex gap-2 mb-2 px-5 align-middle">
          <input type="text" placeholder="Search" className="px-2 h-12 flex-1 rounded-lg" name="search" id="search" />
          <button type="submit" className="btn btn-active flex-4">
            SEARCH
          </button>
        </div>
      </form>

      <InfiniteScroll
        dataLength={Number(items?.length)}
        next={handleMore}
        hasMore={hasMore}
        loader={
          <div className="text-center h-full">
            <span className="loading loading-dots loading-lg text-red-600"></span>
          </div>
        }
      >
        <div className="flex flex-col">
          {items?.map((el) => {
            return <CardProduct key={el.slug} product={el} />;
          })}
        </div>
      </InfiniteScroll>
    </>
  );
}
