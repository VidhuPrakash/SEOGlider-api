import lighthouse from "lighthouse";
import puppeteer from "puppeteer";
import { URL } from "url";

export const checkPageSpeed = async (url) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Run Lighthouse
    const port = new URL(browser.wsEndpoint()).port;
    const { lhr } = await lighthouse(url, {
      port,
      output: "json",
      logLevel: "info",
    });

    await browser.close();

    return {
      performance: lhr.categories.performance?.score * 100 || "N/A",
      accessibility: lhr.categories.accessibility?.score * 100 || "N/A",
      bestPractices: lhr.categories["best-practices"]?.score * 100 || "N/A",
      seo: lhr.categories.seo?.score * 100 || "N/A",
      loadTime:
        lhr.audits["speed-index"]?.numericValue.toFixed(2) + " ms" || "N/A",
    };
  } catch (error) {
    console.error("Page speed analysis failed:", error);
    return { error: "Failed to analyze page speed" };
  }
};
