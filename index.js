const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.raw({ limit: "10mb", type: () => true }));

app.post("/screenshot", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    res.status(400).json({ error: "Missing url" });
    return;
  }
  let browser;
  try {
    browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const screenshot = await page.screenshot({ encoding: "base64" });
    await browser.close();
    res.json({ screenshot });
  } catch (err) {
    if (browser) await browser.close();
    res.status(500).json({ error: err.message });
  }
});

app.post("/pdf", async (req, res) => {
  const { html, format } = req.body;
  if (!html) {
    res.status(400).json({ error: "Missing html" });
    return;
  }
  let browser;
  try {
    browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        // "--disable-setuid-sandbox",
        // "--disable-dev-shm-usage",
      ],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    // await page.waitForTimeout(3500);
    const pdfBuffer = await page.pdf({
      format: format || "A4",
      printBackground: true,
    });
    await browser.close();
    res.set({ "Content-Type": "application/pdf" });
    res.send(pdfBuffer);
  } catch (err) {
    if (browser) await browser.close();
    res.status(500).json({ error: err.message });
  }
});

// Handle unexpected errors to prevent server crash
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

app.listen(3001, () => {
  console.log("Pupptearea API running on port 3001");
});
