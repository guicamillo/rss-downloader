import { MongoClient, Db } from "mongodb";

let cachedDb: Db | null = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  const db = await client.db(process.env.MONGO_DB_NAME);

  cachedDb = db;
  return db;
}

export { connectToDatabase };
