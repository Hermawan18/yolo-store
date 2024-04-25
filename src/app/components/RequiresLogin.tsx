import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function RequestLogin({ children }: { children: React.ReactNode }) {
  const token = cookies().get('token');

  if (!token) {
    redirect('/login');
  }

  return children;
}
