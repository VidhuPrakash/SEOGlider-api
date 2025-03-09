import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import seoRoutes from "./src/routes/seo.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// Routes
app.get("/", (req, res) => res.send("Welcome to SEOGlide API.."));
app.use("/api/seo", seoRoutes);

app.listen(PORT, () => console.log(`SEOGlide API running on port ${PORT}`));
