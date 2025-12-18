const express = require("express");
const path = require("path");

const app = express();

// Parse JSON (fetch(..., {headers:{'Content-Type':'application/json'}}))
app.use(express.json());

// Parse classic HTML form posts (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Serve everything in /public as static pages
app.use(express.static(path.join(__dirname, "public")));

/**
 * -------------------------
 * Node API EXAMPLES (req/res)
 * -------------------------
 */

// Example: function on server + POST (square)
function square(n) { return n * n; }
app.post("/api/square", (req, res) => {
  const n = Number(req.body.n);
  if (Number.isNaN(n)) return res.status(400).json({ error: "n must be a number" });
  res.json({ n, squared: square(n) });
});

// Example: return an object as JSON
app.get("/api/product", (req, res) => {
  res.json({ id: 101, name: "Keyboard", price: 49.99, inStock: true });
});

// Example: Set dedupe on server
app.post("/api/dedupe", (req, res) => {
  const items = Array.isArray(req.body.items) ? req.body.items : [];
  const unique = [...new Set(items)];
  res.json({ originalCount: items.length, uniqueCount: unique.length, unique });
});

// Example: Map-backed in-memory store
const store = new Map();
app.post("/api/store", (req, res) => {
  const { key, value } = req.body;
  if (!key) return res.status(400).json({ error: "key required" });
  store.set(String(key), value);
  res.json({ ok: true, size: store.size });
});
app.get("/api/store/:key", (req, res) => {
  const key = req.params.key;
  if (!store.has(key)) return res.status(404).json({ error: "not found" });
  res.json({ key, value: store.get(key) });
});

// Example: status codes
app.get("/api/status-demo", (req, res) => {
  const mode = req.query.mode;
  if (mode === "ok") return res.json({ ok: true });
  if (mode === "bad") return res.status(400).json({ error: "bad request example" });
  return res.status(404).json({ error: "not found example" });
});

// Example: query params
app.get("/api/tip", (req, res) => {
  const bill = Number(req.query.bill);
  const pct = Number(req.query.pct);
  if (Number.isNaN(bill) || Number.isNaN(pct)) {
    return res.status(400).json({ error: "bill & pct required" });
  }
  res.json({ bill, pct, tip: bill * (pct / 100), total: bill * (1 + pct / 100) });
});

// Example: classic HTML form submit to server
app.post("/contact", (req, res) => {
  const { name, message } = req.body;
  res.send(`<!doctype html>
  <html><head><meta charset="utf-8"/><title>Contact Received</title></head>
  <body style="font-family: system-ui, sans-serif; padding: 16px;">
    <h2>Thanks, ${escapeHtml(name || "friend")}!</h2>
    <p><strong>Message received:</strong></p>
    <pre>${escapeHtml(message || "")}</pre>
    <p><a href="/node-contact.html">Back</a></p>
  </body></html>`);
});

// Example: custom response header
app.get("/api/with-header", (req, res) => {
  res.set("X-App-Version", "1.0");
  res.json({ message: "Check the response headers!" });
});

// Example: simple todos (in-memory)
let todos = [{ id: 1, text: "Learn functions" }];
app.get("/api/todos", (req, res) => res.json(todos));
app.post("/api/todos", (req, res) => {
  const text = String(req.body.text || "").trim();
  if (!text) return res.status(400).json({ error: "text required" });
  const next = { id: Date.now(), text };
  todos.push(next);
  res.status(201).json(next);
});

// Root -> index page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
