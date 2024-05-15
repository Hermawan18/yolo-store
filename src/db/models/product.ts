import { getDb } from './user';
import { Product } from '@/types';

// get products
export async function getProducts() {
  const db = await getDb();
  let page = 1;
  let pageSize = 6;

  const products = await db
    .collection('products')
    .find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();
  return products;
}

// get products wit pagination
export async function getProductsPagination(page: number) {
  const db = await getDb();
  // let page = 1;
  let pageSize = 6;

  const products = await db
    .collection('products')
    .find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  const totalProducts = await db.collection('products').countDocuments();
  const totalPage = Math.ceil(totalProducts / pageSize);

  return {
    totalPage,
    data: products,
  };
}

//  search product
export async function getSearchProduct(search: string) {
  const db = await getDb();
  const regex = new RegExp(search, 'i');

  const resultProduct = await db.collection('products').find({ name: regex }).toArray();
  return resultProduct;
}

// get product by slug
export async function getProductById(slug: string) {
  const db = await getDb();

  const product = await db.collection('products').findOne({ slug });
  return product;
}
