import { Request, Response } from "express";
import { connectToDatabase } from "./db";

const BuildRSSTemplate = (items: RSSItem[]) => {
  return `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
          <atom:link href="https://rss-downloader.now.sh/rss" rel="self" type="application/rss+xml" />
          <title>Guilherme's Torrents</title>
          <description>:D</description>
          <link>https://rss-downloader.now.sh/rss</link>
          <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
          <copyright>(c) 2020 </copyright>
          ${items.map((item) => BuildRSSItem(item)).join("\t\n")}
      </channel>
  </rss>`;
};

const BuildRSSItem = (data: RSSItem) => {
  const { name, link, _id: id, dateAdded: pubDate } = data;

  return `
  <item>
      <title>${name}</title>
      <description>${name}</description>
      <link><![CDATA[${link}]]></link>
      <guid isPermaLink="false">${id}</guid>
      <pubDate>${pubDate.toUTCString()}</pubDate>
  </item>`;
};

interface RSSItem {
  name: string;
  link: string;
  dateAdded: Date;
  _id: string;
}

async function rss(req: Request, res: Response) {
  const db = await connectToDatabase(process.env.MONGODB_URI as string);
  const collection = await db.collection(
    process.env.MONGO_DB_COLLECTION as string
  );
  const torrents = await collection.find({}).sort({ dateAdded: -1 }).toArray();

  res.status(200).type("text/xml").send(BuildRSSTemplate(torrents));
}

export { rss as default, BuildRSSTemplate, BuildRSSItem };
