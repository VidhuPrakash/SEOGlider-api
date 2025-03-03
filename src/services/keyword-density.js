import { fetchHTML } from "./fetch-html.js";
import * as cheerio from "cheerio";

// Analyze keyword density
export const analyzeKeywordDensity = async (url) => {
  try {
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);
    const text = $("body").text().replace(/\s+/g, " ").toLowerCase();
    const words = text.match(/\b\w+\b/g) || [];

    const frequency = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  } catch (error) {
    throw new Error("Failed to analyze keyword density");
  }
};
