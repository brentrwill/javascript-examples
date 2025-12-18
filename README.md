# JS + HTML Dynamic UI + Node req/res (Explained Bundle)

This bundle contains:
- **10 pure HTML + JavaScript** pages that demonstrate **dynamic UI changes**.
- **9 Node.js (Express)** pages that demonstrate **HTTP request/response** (GET/POST, status codes, headers, JSON, forms).

## Run it
1) Install dependencies:
```bash
npm install
```

2) Start the server:
```bash
npm start
```

3) Open:
- Home: http://localhost:3000/

---

## How to learn from these
For each page:
1) Open DevTools (F12 / Cmd+Opt+I)
2) Watch:
   - **Console** for logs (some pages log)
   - **Elements** for DOM changes
   - **Network** for HTTP requests (Node pages)

---

## Part A — Dynamic UI pages (what they do)

### UI 01 Toggle show/hide
- Click toggles a paragraph by changing `element.style.display`.
- You learn: **event listener**, **DOM selection**, **style changes**.

### UI 02 Live character counter
- `input` event fires on every keystroke; update `<span>` text.
- You learn: **live updates**, **textContent**, **input event**.

### UI 03 Theme switcher
- Toggles light/dark by changing `document.body` styles.
- You learn: **state variable**, **conditional styling**.

### UI 04 Add items to list
- Reads input value, creates `<li>`, appends to `<ul>`.
- You learn: **createElement**, **appendChild**, **clearing input**.

### UI 05 Remove clicked item (delegation)
- One listener on `<ul>` handles clicks on any `<li>`.
- You learn: **event delegation**, `e.target`, removing nodes.

### UI 06 Form validation
- Prevents submit, validates email, shows/hides error message.
- You learn: **preventDefault**, basic validation, UI feedback.

### UI 07 Progress bar while typing
- Calculates percentage and updates bar width.
- You learn: **math**, **style width**, real-time indicators.

### UI 08 Tabs
- Buttons hide all panels then show one.
- You learn: **show one/hide many**, dataset usage.

### UI 09 Filter list as you type
- Filters list items by hiding those that don't match.
- You learn: **string matching**, **dynamic filtering UI**.

### UI 10 Modal
- Uses a “backdrop” overlay shown/hidden with flex display.
- Click outside closes modal using `if (e.target === backdrop)` check.

---

## Part B — Node pages (what they do)

### Node Square (POST /api/square)
- Browser sends a number.
- Server validates and responds with `{ n, squared }`.
- You learn: **POST**, body parsing, JSON response.

### Node Product (GET /api/product)
- Browser GETs JSON; UI prints it.
- You learn: **GET**, JSON payload, render output.

### Node Dedupe (POST /api/dedupe)
- Browser sends array JSON; server uses `Set` to dedupe.
- You learn: JSON POST, Set usage on server.

### Node Store (POST /api/store, GET /api/store/:key)
- Stores key/value in a `Map` (in memory).
- You learn: path params, Map storage, 404 when missing.

### Node Status (GET /api/status-demo)
- Returns 200/400/404 based on query string.
- You learn: status codes + reading response.

### Node Tip (GET /api/tip?bill=&pct=)
- Returns calculated totals from query params.
- You learn: query strings, validation.

### Node Contact (POST /contact)
- Standard HTML form posts urlencoded data.
- Server responds with an HTML "thank you" page.
- You learn: traditional form submission (no fetch).

### Node Headers (GET /api/with-header)
- Server sets `X-App-Version`; client reads it.
- You learn: custom headers.

### Node Todos (GET/POST /api/todos)
- GET loads list; POST adds a new item; UI refreshes.
- You learn: simple CRUD-ish workflow, 201 Created.

---

## Notes
- All Node data is **in-memory**, so restarting the server resets the store/todos.
