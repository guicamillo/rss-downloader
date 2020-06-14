import { Request, Response } from "express";
import { connectToDatabase } from "./db";

async function add(req: Request, res: Response) {
  const { name, link, type } = req.query;
  if (!name || !link) {
    res.status(500).json({
      status: "API_ERROR",
      reason: "Missing either name or link ",
    });
    return;
  }

  const db = await connectToDatabase(process.env.MONGODB_URI as string);
  const collection = await db.collection(
    process.env.MONGO_DB_COLLECTION as string
  );

  const status = await collection.insertOne({
    name,
    link: decodeURIComponent(link as string),
    dateAdded: new Date(),
    type,
  });

  res.status(200).json({
    status: "SUCCESS",
    description: `Just added ${name} & ${decodeURIComponent(link as string)}`,
  });
}

export default add;
