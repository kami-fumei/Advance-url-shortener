import express from "express";
const routes = express.Router();
import { setUrl, getUrl } from "../controllers/brain.js";
import { urls } from "../models/urlSchema.js";

//favicon
routes.get("/favicon.ico", (req, res) => {
  res.status(201);
});

// routes.post('/set',setUrl);

routes.get("/:sh/an", async (req, res) => {
  let vistDT = await urls.findOne({ shUrl: req.params.sh });
  const groupedData = {};
  if (!vistDT) {
    return res.status(404).json({ error: "URL not found" });
  }
  vistDT = vistDT.vistDT;

  vistDT.forEach(({ time }) => {
    const date = new Date(time).toISOString().split("T")[0]; // Extract date (YYYY-MM-DD)
    groupedData[date] = (groupedData[date] || 0) + 1;
  });

  const dates = Object.keys(groupedData);
  const counts = Object.values(groupedData);

  res.render("an.ejs", { dates, counts });
});
routes.get("/:shUrl", getUrl);

//todo
// routes.put('/', );
// routes.delete('/',;

export default routes;
