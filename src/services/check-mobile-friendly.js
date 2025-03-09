import puppeteer from "puppeteer";

// Mobile-Friendliness Check
export const checkMobileFriendliness = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "load" });
    const isMobileFriendly = await page.evaluate(
      () => window.innerWidth <= 768
    );
    await browser.close();
    return { mobileFriendly: isMobileFriendly };
  } catch (error) {
    throw new Error("Failed to check mobile-friendliness");
  }
};
