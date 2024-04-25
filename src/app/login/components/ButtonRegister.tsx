import Link from 'next/link';

export default function ButtonRegister({ children }: React.PropsWithChildren) {
  return (
    <Link href={'/register'} className="btn btn-primary mt-5">
      {children}
    </Link>
  );
}
