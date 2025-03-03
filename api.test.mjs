const request = require("supertest");
const app = require("../server.js");

describe("SEOGlide API Tests", () => {
  test("Metadata Extraction", async () => {
    const res = await request(app).get("/api/metadata?url=https://example.com");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("title");
  });

  test("Keyword Density Analysis", async () => {
    const res = await request(app).get(
      "/api/keyword-density?url=https://example.com"
    );
    expect(res.status).toBe(200);
  });

  test("Readability Score", async () => {
    const res = await request(app).get(
      "/api/readability?url=https://example.com"
    );
    expect(res.status).toBe(200);
  });

  test("Broken Links Checker", async () => {
    const res = await request(app).get(
      "/api/broken-links?url=https://example.com"
    );
    expect(res.status).toBe(200);
  });

  test("Page Speed Analysis", async () => {
    const res = await request(app).get(
      "/api/page-speed?url=https://example.com"
    );
    expect(res.status).toBe(200);
  });
});
