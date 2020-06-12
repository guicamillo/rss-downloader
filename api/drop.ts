import { Request, Response } from "express";
import { connectToDatabase } from "./db";

async function drop(req: Request, res: Response) {
  const { force } = req.query;
  if (!force) {
    res.status(500).json({
      status: "API_ERROR",
      reason: "this operation needs to be forced",
    });
    return;
  }

  const db = await connectToDatabase(process.env.MONGODB_URI as string);
  const collection = await db.collection(
    process.env.MONGO_DB_COLLECTION as string
  );

  await collection.deleteMany({});
  res.status(200).json({ status: "OK" });
}

export default drop;
