import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface Product {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Wishlist {
  _id: string;
  userId: string;
  productId: string;
  createdAt?: Date;
  updatedAt?: Date;
  products: Product[];
}

export interface FetchDataType {
  statusCode: number;
  message: string;
  data: Product[];
}

interface Pagination {
  totalPage: number;
  data: Product[];
}

export interface FetchDataProducts {
  statusCode: number;
  message: string;
  data: Pagination;
}

export interface FetchDataProduct {
  statusCode: number;
  message: string;
  data: Product;
}

export interface FetchDataTypeWishlist {
  statusCode: number;
  message: string;
  data: Wishlist[];
}

export interface FormDataLogin {
  email: string;
  password: string;
}

export interface FormDataRegister {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface ErrorLoginType {
  statusCode: number;
  code: string;
  message: string;
}
