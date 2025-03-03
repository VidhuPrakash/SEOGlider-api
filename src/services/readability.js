import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import { fetchHTML } from "./fetch-html.js";

// Compute readability score using Flesch Reading Ease formula
export const computeReadability = async (url) => {
  try {
    const html = await fetchHTML(url);
    const dom = new JSDOM(html);
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article) return { readabilityScore: "N/A" };

    const text = article.textContent;
    const words = text.match(/\b\w+\b/g)?.length || 1;
    const sentences = text.match(/[\.\!\?]+/g)?.length || 1;
    const syllables = text
      .split(/\s+/)
      .reduce(
        (count, word) =>
          count +
            word
              .replace(/(?:[^aeiouy]es|ed|[^aeiouy]e)$/, "")
              .match(/[aeiouy]{1,2}/g)?.length || 0,
        0
      );

    // Flesch Reading Ease formula
    const readabilityScore =
      206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);

    return { readabilityScore: readabilityScore.toFixed(2) };
  } catch (error) {
    console.error("Readability Analysis Failed:", error.message);
    throw new Error("Failed to analyze readability");
  }
};
