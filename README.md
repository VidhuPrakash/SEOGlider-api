# SEOGlide API

SEOGlide API is a powerful and lightweight API designed to extract metadata and optimize web pages for SEO. Built with **Node.js, Express, and Puppeteer**, it provides real-time insights for SEO professionals and developers.

## Features
- Extract metadata (title, description, keywords, OpenGraph tags, etc.)
- Analyze webpage readability
- Detect canonical URLs and structured data
- Fetch full HTML content using Puppeteer
- Fast and lightweight, optimized for free-tier hosting

## API Usage
### Base URL
```
https://seoglider-api.onrender.com/api/seo/
```

### Endpoints
#### 1. Extract Metadata
```
GET /api/seo?url=<website_url>
```
**Response Example:**
```json
{
  "title": "Example Title",
  "description": "Meta description of the page",
  "keywords": ["SEO", "optimization", "metadata"],
  "canonical": "https://example.com"
}
```

#### 2. Fetch Readability Score
```
GET /api/readability?url=<website_url>
```
**Response Example:**
```json
{
  "readability_score": 78,
  "content_summary": "This article discusses..."
}
```

## Deployment
SEOGlide API is hosted on **Render’s free tier**, optimized for low resource usage. The backend uses **Puppeteer with chrome-aws-lambda** for rendering pages efficiently.

## Free Trial & Daily Limit
- **Free Trial:** Users can make up to **X** requests per day.
- **Paid Plans:** Coming soon for higher limits.

## Installation (For Local Development)
```sh
git clone https://github.com/your-repo/SEOGlide-API.git
cd SEOGlide-API
yarn install
```

### Environment Setup
Create a `.env` file with:
```
PORT=3000
```
Then, run the server:
```sh
yarn dev
```

## Contributing
This project is not open-source, but feedback and feature requests are welcome!

## Contact & Support
For support or business inquiries, reach out at **vidhu0dev@gmail.com**.

