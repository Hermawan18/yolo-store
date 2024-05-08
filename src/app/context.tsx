'use client';
import { Wishlist } from '@/types';
import { createContext, useState } from 'react';

export const WishlistContext = createContext({});

export default function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);

  return <WishlistContext.Provider value={{ wishlist, setWishlist }}>{children}</WishlistContext.Provider>;
}
