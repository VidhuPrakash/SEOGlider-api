import * as cheerio from "cheerio";
import axios from "axios";

/**
 * Extract the number of headings from a given webpage
 *
 * @param {string} url URL of the webpage to extract headings from
 * @returns {Promise<{h1: number, h2: number, h3: number}>} A promise that
 * resolves with an object containing the number of h1, h2, and h3 headings
 * found on the webpage
 * @throws {Error} If an error occurs while extracting headings
 */
export const extractHeadings = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return {
      h1: $("h1").length,
      h2: $("h2").length,
      h3: $("h3").length,
    };
  } catch (error) {
    throw new Error("Failed to extract headings");
  }
};
