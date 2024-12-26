import express from "express";
import routes from "./routes/routes.js";
import { connectMongoDB } from "./controllers/connect.mongodb.js";
import { setUrl } from "./controllers/brain.js";
import { urls } from "./models/urlSchema.js";

const app = express();

connectMongoDB("mongodb://localhost:27017/url-shortener-adv")
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);

app.get("/", (req, res) => {
  const ex = req.query.ex;
  return res.render("index.ejs", { ex: ex });
});

app.post("/shortUrl.nodejs", async (req, res) => {
  const result = await setUrl(req, res);

  if (result.error === true) {
    if (result.code === "c") {
      res.redirect("/?ex=true");
    }
    if (result.code === "d") {
      res.end("<h1>some data base error<h1>");
    }
    if (result.code === "b") {
      res.end(
        '<h1>URL required (You messed with  HTML right I know ) now <a href= "/">go back </a> :) </h1> '
      );
    }
  } else {
    return await res.render("sh.ejs", {
      sh: result.sh,
      og: result.body,
    });
  }
});

app.get("/an", async (req, res) => {
  const vistDT = await urls.findOne({ shUrl: "car" }).vistDT;
  const groupedData = {};

  vistDT.forEach(({ time }) => {
    const date = new Date(time).toISOString().split("T")[0]; // Extract date (YYYY-MM-DD)
    groupedData[date] = (groupedData[date] || 0) + 1;
  });

  const dates = Object.keys(groupedData);
  const counts = Object.values(groupedData);

  res.render("an.ejs", { dates, counts });
});

app.listen(8000, () => {
  console.log("sever running at 8000");
});
