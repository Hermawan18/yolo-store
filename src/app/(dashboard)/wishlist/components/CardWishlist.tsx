'use client';
import { Product, Wishlist } from '@/types';
import { useRouter } from 'next/navigation';
import { MdRemoveShoppingCart } from 'react-icons/md';

type HandleFetchWishlist = () => void;
export default function CardWishlist({ wishlist, fetchWishlist, productWishlist }: { wishlist: Wishlist; fetchWishlist: HandleFetchWishlist; productWishlist: Wishlist[] }) {
  const navigation = useRouter();
  async function DeleteWishlist(wishlistId: string) {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/wishlist', {
      method: 'DELETE',
      headers: {
        cookie: document.cookie,
      },
      cache: 'no-store',
      body: JSON.stringify({ wishlistId }),
    });

    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error('fetch error dari delete wishlist');
    }

    fetchWishlist();
    return responseBody;
  }

  return (
    <>
      <div className="card card-compact w-96 bg-base-100 shadow-xl m-2">
        <figure>
          <img src={wishlist?.products[0]?.thumbnail} alt="Shoes" />
        </figure>
        <div className="card-body text-white">
          <h2 className="card-title">{wishlist?.products[0]?.name}</h2>
          <p>{wishlist?.products[0]?.description}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary hover:bg-red-800 hover:text-white hover:border-red-800"
              onClick={() => {
                DeleteWishlist(wishlist._id.toString());
              }}
            >
              <MdRemoveShoppingCart className="text-2xl" />
            </button>
            {/* <button className="btn btn-primary">Buy Now</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
