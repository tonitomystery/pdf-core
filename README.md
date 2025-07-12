# PDF Core Service

A Node.js service that provides APIs for generating screenshots and PDF documents from URLs or HTML content using Puppeteer.

## API Documentation

### Base URL

```
http://localhost:3001
```

### Endpoints

#### 1. Generate Screenshot

Captures a screenshot of a specified URL.

```
POST /screenshot
```

**Request Body:**

```json
{
  "url": "https://example.com"
}
```

| Parameter | Type   | Required | Description                     |
|-----------|--------|----------|---------------------------------|
| url       | string | Yes      | The URL to capture screenshot of |

**Response:**

```json
{
  "screenshot": "base64EncodedScreenshotData"
}
```

**Error Responses:**

- `400 Bad Request`: When URL is missing
  ```json
  {
    "error": "Missing url"
  }
  ```

- `500 Internal Server Error`: When screenshot capture fails
  ```json
  {
    "error": "Error message"
  }
  ```

#### 2. Generate PDF

Generates a PDF from provided HTML content.

```
POST /pdf
```

**Request Body:**

```json
{
  "html": "<html>...</html>",
  "format": "A4"
}
```

| Parameter | Type   | Required | Description                                       |
|-----------|--------|----------|---------------------------------------------------|
| html      | string | Yes      | The HTML content to convert to PDF                |
| format    | string | No       | PDF page format (default: "A4")                   |

**Response:**

- PDF document with `Content-Type: application/pdf`

**Error Responses:**

- `400 Bad Request`: When HTML is missing
  ```json
  {
    "error": "Missing html"
  }
  ```

- `500 Internal Server Error`: When PDF generation fails
  ```json
  {
    "error": "Error message"
  }
  ```

## Running the Service

```bash
npm install
node index.js
```

The service will run on port 3001.
