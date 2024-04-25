import { FetchDataType, Product } from '@/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const handleAddWishlist = async (id: string) => {
  'use server';
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/wishlist', {
    method: 'POST',
    cache: 'no-store',
    body: JSON.stringify({ productId: id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseBody: FetchDataType = await response.json();
  console.log(responseBody, '<<<< dari add wishlist');

  if (!response.ok) {
    throw new Error('fetch error dari add wishlist');
  }
  return responseBody;
};

export const handleLogout = async () => {
  'use server';
  cookies().delete('token');
  redirect('/login');
};
