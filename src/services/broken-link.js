import { URL } from "url"; // Add this at the top
import { fetchHTML } from "./fetch-html.js";
import * as cheerio from "cheerio";

export const checkBrokenLinks = async (url) => {
  try {
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);
    const baseUrl = new URL(url).origin; // Get base URL
    const links = [];

    $("a").each((_, elem) => {
      let link = $(elem).attr("href");
      if (link && !link.startsWith("http")) {
        link = new URL(link, baseUrl).href; // Convert to absolute URL
      }
      if (link) links.push(link);
    });

    const brokenLinks = await Promise.all(
      links.map(async (link) => {
        try {
          await axios.head(link, { timeout: 5000 });
          return null; // Not broken
        } catch {
          return link; // Broken link
        }
      })
    );

    return brokenLinks.filter(Boolean);
  } catch (error) {
    throw new Error("Error in broken-link:", error);
  }
};
