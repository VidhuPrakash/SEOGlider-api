import axios from "axios";
import * as cheerio from "cheerio";

export const extractMetadata = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "SEOGlide-Bot" },
    });
    const $ = cheerio.load(data);

    return {
      title: $("title").text(),
      description: $('meta[name="description"]').attr("content") || "",
      keywords: $('meta[name="keywords"]').attr("content") || "",
      ogTitle: $('meta[property="og:title"]').attr("content") || "",
      ogDescription: $('meta[property="og:description"]').attr("content") || "",
    };
  } catch (error) {
    throw new Error("Failed to extract metadata");
  }
};
