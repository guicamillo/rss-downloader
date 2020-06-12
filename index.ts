import express from "express";
import { json, rss, drop, add } from "./api";

const port = process.env.PORT || 3000;

var app = express();
app.use(express.json());

app
  .listen(port, () => {
    console.log("> Ready to roll");
  })
  .on("error", (err) => {
    throw err;
  });

app
  .get("/json", json)
  .get("/rss", rss)
  .get("/delete", drop)
  .use("/add", add)
  .use("/", (req, res) => {
    res.status(500).json({
      BAD_BAD_SERVER: "NO DONUT FOR YOU",
    });
  });
