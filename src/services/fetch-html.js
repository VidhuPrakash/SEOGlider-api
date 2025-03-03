import puppeteer from "puppeteer";

export const fetchHTML = async (url) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled",
      ],
    });

    const page = await browser.newPage();

    // Set user agent to mimic a real browser
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
    );

    // Bypass bot detection
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => false });
    });

    // Go to the page with a longer timeout and wait for network idle
    await page.goto(url, {
      waitUntil: "networkidle2", // Wait until network is mostly idle
      timeout: 60000, // Increase timeout to 60 seconds
    });

    // Wait for the body element to ensure page has loaded
    await page.waitForSelector("body", { timeout: 10000 });

    const html = await page.content(); // Get full HTML content

    return html;
  } catch (error) {
    console.error("Error fetching HTML:", error);
    throw new Error("Failed to fetch HTML");
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
