import * as cheerio from "cheerio";
import axios from "axios";

/**
 * Checks image optimization on a given webpage.
 *
 * @param {string} url - The URL of the webpage to analyze.
 * @returns {Promise<Array<{src: string, alt: string}>>} A promise that resolves to an array of objects,
 * each containing the source URL and alt text of an image.
 * If an image is missing an alt attribute, it will be noted as "Missing alt attribute".
 * @throws {Error} If the request to fetch the webpage fails.
 */
export const checkImageOptimization = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const images = $("img");
    const results = images
      .map((i, img) => ({
        src: $(img).attr("src"),
        alt: $(img).attr("alt") || "Missing alt attribute",
      }))
      .get();
    return results;
  } catch (error) {
    throw new Error("Failed to check image optimization");
  }
};
