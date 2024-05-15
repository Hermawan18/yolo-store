'use client';

import { ErrorLoginType, FetchDataType } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function FormRegister() {
  const navigation = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);

  const handleFormSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get('name');
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, username, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseBody: FetchDataType | ErrorLoginType = await response.json();

    if (!response.ok) {
      const error = responseBody?.message;
      setError(error);
    } else {
      navigation.push('/login');
    }
  };
  return (
    <>
      <form className="py-5" onSubmit={handleFormSubmit}>
        <h1 className="text-4xl text-center font-bold mb-2">BUAT AKUN</h1>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="username">
            USERNAME <span className="text-red-600">*</span>
          </label>
          <input type="text" className="px-2 h-10 text-white" name="username" id="username" />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="name">NAMA</label>
          <input type="text" className="px-2 h-10 text-white" name="name" id="name" />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="email">
            ALAMAT EMAIL <span className="text-red-600">*</span>
          </label>
          <input type="text" placeholder="Masukkan alamat email Anda" className="px-2 h-10 text-white" name="email" id="email" />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="password">
            KATA SANDI <span className="text-red-600">*</span>
          </label>
          <input type="password" className="px-2 h-10 text-white" name="password" id="password" />
        </div>
        <p className="text-red-600">{error}</p>
        <div className="flex justify-center">
          <button className="btn btn-active w-1/2 mt-2 text-white">DAFTAR</button>
        </div>
      </form>
    </>
  );
}
