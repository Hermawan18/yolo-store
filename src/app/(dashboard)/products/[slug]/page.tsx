import { getProductById } from '@/db/models/product';
import { AddWishlist } from './components/AddWishlist';
import type { Metadata } from 'next';

export default async function DetailProduct({ params }: { params: { slug: string } }) {
  const product = await getProductById(params.slug);

  const formatRupiah = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(product.price);

  const metadata: Metadata = {
    title: product.name,
    description: product.description,
  };

  return (
    <>
      <div className="h-screen px-3 mt-10 ">
        <div className=" flex">
          <figure className="" style={{ width: '800px' }}>
            <img src={product.thumbnail} alt="Shoes" />
          </figure>
          <div className="w-56 flex flex-col ms-2">
            {product?.images?.map((el, i) => {
              return (
                <figure key={i} className="w-full">
                  <img src={el} alt="Shoes" />
                </figure>
              );
            })}
          </div>
          <div className="p-3">
            <h1 className="text-6xl font-bold">{product.name}</h1>
            <br />
            <h2 className="text-3xl font-semibold">{formatRupiah.split(',')[0]}</h2>
            <br />
            <p className="text-lg text-slate-600">{product.description}</p>
            <br />
            <p className="text-md text-slate-600 italic">{product.excerpt}</p>
            <AddWishlist product={product}>ADD WISHLIST</AddWishlist>
          </div>
        </div>
      </div>
    </>
  );
}
