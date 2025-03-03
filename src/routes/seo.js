import express from "express";
import { extractMetadata } from "../services/metadata.js";
import { analyzeKeywordDensity } from "../services/keyword-density.js";
import { computeReadability } from "../services/readability.js";
import { analyzePageSpeed } from "../services/page-speed.js";
import { checkBrokenLinks } from "../services/broken-link.js";

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

export default router;
