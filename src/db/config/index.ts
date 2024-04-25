import { MongoClient } from 'mongodb';

const connectionString = process.env.MONGO_STRING;

if (!connectionString) {
  throw new Error('MONGODB connection string is not defined');
}

let client: MongoClient;
export const getMongoClientInstance = async () => {
  if (!client) {
    client = new MongoClient(connectionString);
    await client.connect();
  }
  return client;
};
