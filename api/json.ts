import { Request, Response } from "express";
import { connectToDatabase } from "./db";

async function json(req: Request, res: Response) {
  const db = await connectToDatabase(process.env.MONGODB_URI as string);
  const collection = await db.collection(
    process.env.MONGO_DB_COLLECTION as string
  );
  const torrents = await collection.find({}).sort({ dateAdded: -1 }).toArray();

  res.json({ torrents });
}

export default json;
