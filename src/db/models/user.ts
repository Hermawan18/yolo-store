import { User } from '@/types';
import { getMongoClientInstance } from '../config';
import bcrypt from 'bcryptjs';

// getDB
export async function getDb() {
  const client = await getMongoClientInstance();
  const db = client.db('graded2');
  return db;
}

// get user all
export async function getUsers() {
  const db = await getDb();

  const users = (await db.collection('users').find().project({ password: 0 }).toArray()) as User[];
  return users;
}

// get user by email
export async function getUserByEmail(email: string) {
  const db = await getDb();

  const user = (await db.collection('users').findOne({ email })) as User;
  return user;
}

type NewUser = Omit<User, '_id' | 'name'>;
// create user
export async function createUser(newUser: NewUser) {
  const db = await getDb();

  const user = await db.collection('users').insertOne({ ...newUser, password: bcrypt.hashSync(newUser.password, 8) });
  return user;
}

// type LoginUser = Omit<User, '_id' | 'name' | 'username'>;
// // login
// export async function Login(loginUser: LoginUser) {
//   const db = await getDb();

//   const user = await db.collection('users').findOne({ email: loginUser.email });

//   return user;
// }
