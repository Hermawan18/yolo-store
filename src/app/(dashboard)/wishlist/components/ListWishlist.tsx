'use client';

import { FetchDataType, FetchDataTypeWishlist, Product, Wishlist } from '@/types';
import { useEffect, useState } from 'react';
import CardProduct from '../../products/components/CardProduct';
import CardWishlist from './CardWishlist';
import FormatRupiah from '@/db/helpers/formatRupiah';
import Swal from 'sweetalert2';

export function ListWishlist() {
  const [productWishlist, setProductWishlist] = useState<Wishlist[]>([]);
  let totalPrice: number = 0;

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

  async function DeleteWishlist(wishlistId: string) {
    const response = await fetch('http://localhost:3000/api/wishlist', {
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
    <div className="h-screen">
      {/* <h1 className="text-center mb-5 font-bold text-4xl">KERANJANG</h1> */}
      {/* <div className="flex flex-row mt-5">
        {productWishlist?.map((el, i) => {
          return <CardWishlist key={i} wishlist={el} fetchWishlist={fetchWishlist} productWishlist={productWishlist} />;
        })}
      </div> */}

      <table className="table-auto m-auto text-center border-2 border-black" style={{ width: '80vw' }}>
        <thead className="border-b-2 border-black rounded-t-md">
          <tr>
            <th className="border-r-2 border-black">No.</th>
            <th className="border-r-2 border-black">Nama</th>
            <th className="border-r-2 border-black">Harga</th>
            <th>Pilihan</th>
          </tr>
        </thead>
        <tbody>
          {productWishlist?.map((el, i) => {
            totalPrice += el?.products[0]?.price;
            return (
              <tr key={i}>
                <td className="border-r-2 border-black">{i + 1}</td>
                <td className="border-r-2 border-black">{el?.products[0]?.name}</td>
                <td className="border-r-2 border-black">{FormatRupiah(el?.products[0]?.price).split(',')[0]}</td>
                <td>
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          DeleteWishlist((el?._id).toString());
                          Swal.fire({
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success',
                          });
                        }
                      });
                    }}
                    className="w-full text-red-700 hover:bg-red-700 hover:text-white"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            );
          })}
          <tr className="border-t-2 border-black">
            <td colSpan={2} className="border-r-2 border-black">
              Total
            </td>
            <td className="border-r-2 border-black">{FormatRupiah(totalPrice).split(',')[0]}</td>
            <td>
              <button
                onClick={() => {
                  Swal.fire({
                    title: 'Success',
                    text: 'You clicked the button!',
                    icon: 'success',
                  });
                }}
                className="w-full text-green-700 hover:bg-green-700 hover:text-white"
              >
                Bayar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
