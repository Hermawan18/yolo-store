'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorLoginType, FetchDataType, User } from '@/types';

export default function FormLogin() {
  const navigation = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);

  const handleFromSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseBody: FetchDataType | ErrorLoginType = await response.json();
    console.log(response, '????????');

    if (!response.ok) {
      const message = responseBody?.message;
      setError(message);
    } else {
      navigation.push('/');
    }
  };

  return (
    <>
      <form onSubmit={handleFromSubmit}>
        <h1 className="text-4xl font-bold mb-2">MASUK</h1>
        <p>Masuk dengan alamat e-mail dan kata sandi Anda.</p>
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
        <button type="submit" className="btn btn-active w-1/2 mt-2">
          MASUK
        </button>
      </form>
    </>
  );
}
