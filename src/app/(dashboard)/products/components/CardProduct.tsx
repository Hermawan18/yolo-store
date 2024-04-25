'use client';
import { FetchDataType, Product, Wishlist } from '@/types';
import { useRouter } from 'next/navigation';
import { GrLinkNext } from 'react-icons/gr';
import { MdAddShoppingCart } from 'react-icons/md';

export default function CardProduct({ product }: { product: Product }) {
  const navigation = useRouter();
  const id = product._id.toString();
  console.log(id, '<<<<< dari card product id');

  const handleAddWishlist = async (product: Product) => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/wishlist', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        cookie: document.cookie,
      },
      body: JSON.stringify({ productId: id }),
    });
    const responseBody: FetchDataType = await response.json();

    if (!response.ok) {
      throw new Error('fetch error dari add wishlist');
    }

    return responseBody;
  };

  return (
    <>
      <div className="bg-base-100 shadow-xl flex w-full my-4">
        <figure className="flex-1">
          <img src={product?.thumbnail} alt="Shoes" className="w-full" />
        </figure>
        <div className="card-body bg-white flex-1">
          <h2 className="card-title text-5xl font-bold mb-5">{product?.name}</h2>
          <p className="text-xl text-slate-500">{product?.description}</p>
          <div className="justify-end flex px-5">
            <button className="mx-5" onClick={() => handleAddWishlist(product)}>
              <MdAddShoppingCart className="text-5xl hover:text-green-800" />
            </button>

            <button className="" onClick={() => navigation.push(`/products/${product?.slug}`)}>
              <GrLinkNext className="text-5xl hover:text-green-800" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
