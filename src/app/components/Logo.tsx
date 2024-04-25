import Link from 'next/link';

export default function Logo() {
  return (
    <Link href={'/'}>
      <div className="btn bg-red-700 border-red-700">
        <h1 className="font-bold text-white">YOLO</h1>
      </div>
    </Link>
  );
}
