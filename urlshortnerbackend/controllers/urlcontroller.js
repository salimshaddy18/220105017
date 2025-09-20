import shortid from "shortid";
import Url from "../models/url.js";

export const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const shortCode = shortid.generate();
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    const newUrl = await Url.create({ longUrl, shortUrl });
    return res.json(newUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const shortUrl = `${process.env.BASE_URL}/${req.params.code}`;
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    url.clicks++;
    await url.save();

    return res.redirect(url.longUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
