# SEOGlide API

SEOGlide is a powerful and lightweight SEO analysis API service that provides various SEO-related insights such as metadata extraction, keyword analysis, page speed evaluation, and more.

## Features

- **Metadata Extraction**: Extract title, description, keywords, and Open Graph (OG) tags from a given URL.
- **SEO Score Calculation**: Analyze metadata, heading structure, alt text in images, and keyword density to provide an SEO score for a webpage.
- **Keyword Analysis**: Extract relevant keywords and identify missing primary keywords based on a given target keyword.
- **Heading Structure Analysis**: Check if a webpage follows a proper H1, H2, H3... structure.
- **Broken Link Checker**: Detect and report broken internal and external links on a webpage.
- **Image Optimization Check**: Identify missing alt tags and suggest image compression improvements.
- **Mobile-Friendliness Check**: Evaluate if a website is responsive and mobile-friendly.
- **Page Speed Insights**: Fetch Google Lighthouse analysis data.
- **Robots.txt & Sitemap Analysis**: Validate robots.txt rules and check for a valid sitemap.xml.

  ### Base URL
```
https://seoglider-api.onrender.com/api/seo/
```

## Installation

```bash
git clone https://github.com/VidhuPrakash/SEOGlide-api.git
cd SEOGlide
npm install  # or yarn install
```

## Running the API Server

```bash
npm start  # or yarn start
```

The API will be available at `http://localhost:3000/api`

## API Endpoints

### Metadata Extraction
- **Endpoint:** `GET /api/metadata?url=YOUR_URL`
- **Response:**
  ```json
  {
    "title": "Example Title",
    "description": "Example description",
    "keywords": "example, keywords",
    "ogTitle": "Example OG Title",
    "ogDescription": "Example OG Description"
  }
  ```

### Keyword Analysis
- **Endpoint:** `GET /api/keywords?url=YOUR_URL`

### Heading Structure Analysis
- **Endpoint:** `GET /api/headings?url=YOUR_URL`

### Image Optimization Check
- **Endpoint:** `GET /api/image-optimization?url=YOUR_URL`

### Page Speed Analysis
- **Endpoint:** `GET /api/page-speed?url=YOUR_URL`

### Mobile-Friendliness Check
- **Endpoint:** `GET /api/mobile-friendly?url=YOUR_URL`

### Robots.txt & Sitemap Analysis
- **Endpoint:** `GET /api/robots-sitemap?url=YOUR_URL`

## Contributing
This project is not open-source, but feedback and feature requests are welcome!

## Contact & Support
For support or business inquiries, reach out at **vidhu0dev@gmail.com**.

