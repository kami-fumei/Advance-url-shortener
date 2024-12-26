import { nanoid } from "nanoid";
let shortUrl = "car";
export async function generateUniqueId(database) {
  while (true) {
    const existingEntry = await database.findOne({ shUrl: shortUrl });
    if (existingEntry) {
      console.log(existingEntry);
      shortUrl = nanoid(8);
    } else {
      return shortUrl;
    }
  }
}
