import { Request, Response } from "express";
import { connectToDatabase } from "./db";

async function add(req: Request, res: Response) {
  const { name, link } = req.query;
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
    link,
    dateAdded: new Date(),
  });

  res.status(200).json({
    status: "SUCCESS",
    description: `Just added ${name} & ${link}`,
  });
}

export default add;
