import axios from "axios";
import * as cheerio from "cheerio";
import { fetchHTML } from "./fetch-html.js";

// Function to fetch asset size using HEAD request
const fetchAssetSize = async (src) => {
  if (!src) return null;
  try {
    const response = await axios.head(src, { timeout: 5000 });
    return response.headers["content-length"] || "unknown";
  } catch (error) {
    console.error(`Error fetching asset size for ${src}:`, error.message);
    return null;
  }
};

// Function to analyze page speed
export const analyzePageSpeed = async (url) => {
  try {
    const startTime = performance.now();
    const html = await fetchHTML(url);
    const loadTime = performance.now() - startTime;

    const $ = cheerio.load(html);

    // Extract image and script sources
    const imageSources = $("img")
      .map((_, img) => $(img).attr("src"))
      .get();
    const scriptSources = $("script")
      .map((_, script) => $(script).attr("src"))
      .get()
      .filter(Boolean); // Remove empty script sources

    // Fetch asset sizes and script load times in parallel
    const imageSizePromises = imageSources.map(async (src) => {
      const size = await fetchAssetSize(src);
      return size ? { src, size } : null;
    });

    const scriptLoadPromises = scriptSources.map(async (src) => {
      const start = performance.now();
      try {
        await axios.get(src, { timeout: 5000 });
        return { src, time: performance.now() - start };
      } catch (error) {
        console.error(`Error loading script ${src}:`, error.message);
        return null;
      }
    });

    // Resolve all promises
    const [imageSizes, scriptLoadTimes] = await Promise.all([
      Promise.all(imageSizePromises),
      Promise.all(scriptLoadPromises),
    ]);

    return {
      loadTime: loadTime.toFixed(2) + " ms",
      imageSizes: imageSizes.filter(Boolean),
      scriptLoadTimes: scriptLoadTimes.filter(Boolean),
    };
  } catch (error) {
    console.error("Page Speed Analysis Failed:", error.message);
    throw new Error("Failed to analyze page speed");
  }
};
