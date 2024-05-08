import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/app/components/Navbar';
import WishlistProvider from '../context';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <WishlistProvider>
        <body className={inter.className} style={{ backgroundColor: 'white' }}>
          <Navbar />
          {children}
        </body>
      </WishlistProvider>
    </html>
  );
}
