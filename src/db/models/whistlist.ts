import { Wishlist } from '@/types';
import { getDb } from './user';
import { ObjectId } from 'mongodb';

export async function getWhislists(id: string) {
  const db = await getDb();
  const agg = [
    {
      $match: {
        userId: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'products',
      },
    },
  ];

  const result = (await db.collection('whislist').aggregate(agg).toArray()) as Wishlist[];
  return result;
}

// type WishlistType = Omit<Wishlist, '_id'>;
export async function addWhistlist(userId: string, productId: string) {
  const db = await getDb();
  const newWishlist = {
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection('whislist').insertOne(newWishlist);
  return result;
}

export async function deleteWhislist(_id: string) {
  const db = await getDb();

  const result = await db.collection('whislist').deleteOne({ _id: new ObjectId(_id) });
  return result;
}
