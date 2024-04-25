import { Product } from '@/types';

export function CardHome({ product }: { product: Product }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl my-4">
      <figure>
        <img src={product.thumbnail} alt="Shirt" />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold text-white">{product.name}!</h2>
        <p className="text-gray-400">{product.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">SEE ALL</button>
        </div>
      </div>
    </div>
  );
}
