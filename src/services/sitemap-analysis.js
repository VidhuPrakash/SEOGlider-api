import axios from "axios";
import { URL } from "url";
/**
 * Analyze robots.txt and sitemap.xml of a given URL
 * @param {string} url URL of the website to analyze
 * @returns {Promise<{robots: string, sitemap: string}>} A promise that resolves with an object containing the robots.txt content and the sitemap.xml content
 * @throws {Error} If the request to fetch robots.txt or sitemap.xml fails
 */
export const analyzeRobotsSitemap = async (url) => {
  try {
    const robotsUrl = new URL("/robots.txt", url).href;
    const sitemapUrl = new URL("/sitemap.xml", url).href;

    const robots = await axios
      .get(robotsUrl)
      .then((res) => res.data)
      .catch(() => "Not Found");
    const sitemap = await axios
      .get(sitemapUrl)
      .then((res) => res.data)
      .catch(() => "Not Found");

    return { robots, sitemap };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to analyze robots.txt and sitemap");
  }
};
