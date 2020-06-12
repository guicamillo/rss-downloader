# rss-downloader

This project uses Vercel to host its backend and store the entries on a MongoDB instance.

Assuming you want to store your MongoCredentials on vercel itself (so they don't get checked into the repository):

```bash
vercel secrets add mongo-db-uri <your-secret-uri>
```

In my case, I'm running the Mongo instance on a free instance of [MongoDB cloud](https://www.mongodb.com/cloud).

That's it. Run `vercel --prod` to get it deployed and you're good to go :)
