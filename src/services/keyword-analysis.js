import * as cheerio from "cheerio";
import axios from "axios";

/**
 * Extract keywords from a given URL
 *
 * @param {string} url URL of the webpage to extract keywords from
 * @returns {Promise<{[word: string]: number}>} A promise that resolves with
 * an object containing the keyword counts
 * @throws {Error} If an error occurs while extracting keywords
 */
export const extractKeywords = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const text = $("body").text();
    const words = text.match(/\b\w+\b/g) || [];
    const keywordCounts = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
    return keywordCounts;
  } catch (error) {
    throw new Error("Failed to extract keywords");
  }
};
