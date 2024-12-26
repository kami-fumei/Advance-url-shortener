import { urls } from "../models/urlSchema.js";
import { generateUniqueId } from "./Unique.js";
//SET---------------
async function setUrl(req, res) {
  let body = req.body.url;

  if (!body) {
    return { error: true, code: "b" };
  }

  const x = body.substring(0, 4);

  if (!("http" === x)) {
    body = "https://" + body;
  }

  //check
  let sh = await generateUniqueId(urls);

  //checks custom url given
  if (req.body.custom) {
    const iscustom = await urls.findOne({ shUrl: req.body.custom });
    //checks if custom url available
    if (!iscustom) {
      sh = req.body.custom;
    } //if not send message already exist (app.js line 31)
    else {
      return { error: true, code: "c" };
    }
  }

  await urls
    .create({
      ogUrl: body,
      shUrl: sh,
      ip: req.ip,
      device: req.headers["user-agent"],
      noClick: 1,
    })
    .catch((err) => {
      return { error: true, code: "d" };
    });
  return { sh, body };
}

// GET------------------
async function getUrl(req, res) {
  const sh = req.params.shUrl;

  if (!sh) {
    res.status(400).json({ error: "URL is required" });
  }
  const url = await urls.findOneAndUpdate(
    { shUrl: sh + "" },
    {
      $push: {
        vistDT: { time: Date.now() },
      },
      $inc: { noClick: 1 },
    }
  );

  // const url = await  urls.findOne({shUrl:sh});

  if (url != null) {
    await res.redirect(url.ogUrl);
  } else {
    return res.redirect("/");
  }
}

//exporting the functions
export { setUrl, getUrl };
