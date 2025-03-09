import express from "express";
import { extractMetadata } from "../services/metadata.js";
import { analyzeKeywordDensity } from "../services/keyword-density.js";
import { computeReadability } from "../services/readability.js";
import { analyzePageSpeed } from "../services/page-speed.js";
import { checkBrokenLinks } from "../services/broken-link.js";
import { extractHeadings } from "../services/extract-headings.js";
import { analyzeRobotsSitemap } from "../services/sitemap-analysis.js";
import { extractKeywords } from "../services/keyword-analysis.js";
import { checkImageOptimization } from "../services/image-optimizer-check.js";
import { checkMobileFriendliness } from "../services/check-mobile-friendly.js";
import { checkPageSpeed } from "../services/check-speed.js";

const router = express.Router();

router.get("/metadata", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const metadata = await extractMetadata(url);
    res.json(metadata);
  } catch (error) {
    res.status(500).json({ error: "Failed to extract metadata" });
  }
});

// Keyword Density Analysis
router.get("/keyword-density", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const keywordDensity = await analyzeKeywordDensity(url);
    res.json({ keywordDensity });
  } catch {
    res.status(500).json({ error: "Failed to analyze keyword density" });
  }
});

// Readability Score (Flesch Reading Ease Score)
router.get("/readability", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const readabilityScore = await computeReadability(url);
    res.json({ readabilityScore });
  } catch {
    res.status(500).json({ error: "Failed to analyze readability" });
  }
});

// Broken Link Checker
router.get("/broken-links", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const brokenLinks = await checkBrokenLinks(url);
    res.json({ brokenLinks });
  } catch {
    res.status(500).json({ error: "Failed to check broken links" });
  }
});

// Page Speed Insights
router.get("/page-speed", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const pageSpeed = await analyzePageSpeed(url);
    res.json(pageSpeed);
  } catch {
    res.status(500).json({ error: "Failed to analyze page speed" });
  }
});

// Heading Structure Route
router.get("/headings", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const headings = await extractHeadings(url);
    res.json(headings);
  } catch (error) {
    res.status(500).json({ error: "Failed to extract headings" });
  }
});

// Robots.txt & Sitemap Analysis Route
router.get("/robots-sitemap", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const result = await analyzeRobotsSitemap(url);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to analyze robots.txt and sitemap" });
  }
});
// Keyword Analysis Route
router.get("/keywords", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const keywords = await extractKeywords(url);
    res.json(keywords);
  } catch (error) {
    res.status(500).json({ error: "Failed to extract keywords" });
  }
});

router.get("/image-optimization", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const result = await checkImageOptimization(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to check image optimization" });
  }
});

router.get("/mobile-friendliness", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const result = await checkMobileFriendliness(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to check mobile-friendliness" });
  }
});

// Page Speed Testing Route
router.get("/page-speed", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const result = await checkPageSpeed(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to analyze page speed" });
  }
});
export default router;
