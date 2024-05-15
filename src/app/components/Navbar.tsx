import { cookies } from 'next/headers';
import Logo from './Logo';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FaCartShopping } from 'react-icons/fa6';

export default function Navbar() {
  const token = cookies().get('token');

  async function handleLogout() {
    'use server';
    cookies().delete('token');
    redirect('/login');
  }

  return (
    <>
      <nav className="flex justify-between py-5 bg-white px-5">
        {/* nav left */}
        <div className="flex gap-3 pe-3">
          <Logo />
          <Link className="btn bg-white text-black font-bold hover:bg-gray-400 border-black" href={'/products'}>
            PRODUCTS
          </Link>
        </div>

        {/* nav right */}
        <div className="flex gap-3">
          {/* <Link className="btn bg-white text-black font-bold hover:bg-gray-400 border-black" href={'/wishlist'}>
            <FaCartShopping />
          </Link> */}

          {token ? (
            <form action={handleLogout}>
              <button className="btn bg-white border-red-700 text-red-700 font-bold hover:bg-red-700 hover:border-red-700 hover:text-white" type="submit">
                LOGOUT
              </button>
            </form>
          ) : null}
        </div>
      </nav>
    </>
  );
}
