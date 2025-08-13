## EPISODE 3

# npm Basics: `~` vs `^` and the `-g` Flag

---

## 📌 Difference Between `~` and `^` in `package.json`

When you install a package using `npm install`, it often writes a version with a prefix (`~` or `^`) in your `package.json`. These control how flexible version updates are.

### `~` (Tilde)
- Allows **patch-level** changes only (bug fixes).
- Example:
  ```json
  "lodash": "~4.17.15"
  ```
  This will install versions:
  ```
  >= 4.17.15 and < 4.18.0
  ```

### `^` (Caret)
- Allows **minor-level** and **patch-level** changes.
- Example:
  ```json
  "lodash": "^4.17.15"
  ```
  This will install versions:
  ```
  >= 4.17.15 and < 5.0.0
  ```

---

## 🚀 What is `-g` in `npm install`?

### `-g` stands for **Global** installation:
```bash
npm install -g <package-name>
```

### 🔧 Use Cases:
- Installs the package **system-wide**.
- Makes CLI tools accessible from **anywhere** in the terminal.
- Example:
  ```bash
  npm install -g nodemon
  ```
  Now you can run:
  ```bash
  nodemon app.js
  ```
  from any folder.

### 📂 Global Packages Location:
To see where global packages are stored:
```bash
npm root -g
```

---

## 📌 Summary Table

| Feature           | `~`                         | `^`                         | `-g` (global install)        |
|------------------|-----------------------------|-----------------------------|------------------------------|
| Allows updates   | Patch versions only         | Minor + patch versions      | Installs system-wide         |
| Scope            | Local project               | Local project               | Available everywhere         |
| Use case         | Stable bugfix updates only  | Flexible updates (non-breaking) | CLI tools (e.g., `nodemon`) |



## Episode 4

# 🚦 Express.js Routing and Special Characters

## ✅ What is Routing?

In Express.js, **routing** refers to how an application responds to client requests to a particular endpoint, which is a URL path and a specific HTTP method.

Example:
```js
app.get('/home', (req, res) => {
  res.send('Welcome Home!');
});
```

---

## 🛠 Special Characters in Express Route Paths

Express route paths can include special characters that allow for **pattern matching**. Here’s a breakdown:

---

### 1. `?` — Optional Character

Makes the character before it optional.

```js
app.get('/colou?r', (req, res) => {
  res.send('color or colour!');
});
```

- Matches both `/color` and `/colour`

---

### 2. `:` — Route Parameter (Named Param)

Used to define a dynamic variable in the path.

```js
app.get('/user/:id', (req, res) => {
  res.send(`User ID is ${req.params.id}`);
});
```

- Visiting `/user/123` → `User ID is 123`

---

### 3. `+` — One or More Repetitions

Matches the preceding character or group **one or more times**.

```js
app.get('/go+gle', (req, res) => {
  res.send('Matched gooooogle!');
});
```

- Matches `/gogle`, `/google`, `/gooogle`, etc.

---

### 4. `*` — Wildcard (0 or More Characters)

Matches **any number of characters** (like a wildcard).

```js
app.get('/file/*', (req, res) => {
  res.send('File route with wildcard!');
});
```

- Matches `/file/a`, `/file/a/b/c`, `/file/xyz.jpg`, etc.

---

### 5. `()` — Grouping

Used for **grouping characters** to apply quantifiers.

```js
app.get('/ab(cd)?e', (req, res) => {
  res.send('Matched ab or abcde!');
});
```

- Matches `/abe` and `/abcde`

---

## 🧪 Advanced Example Using All:

```js
app.get('/product/:category/:id?', (req, res) => {
  const { category, id } = req.params;
  res.send(`Category: ${category}, ID: ${id || 'Not Provided'}`);
});
```

- `/product/electronics/123` → `Category: electronics, ID: 123`
- `/product/electronics` → `Category: electronics, ID: Not Provided`

---

## 🧼 Tips:
- Route order **matters** in Express. More specific routes should be defined **before** more general ones.
- Always use parameters (`:`) for dynamic data like IDs.
- Use wildcards (`*`) sparingly — they can match too much and lead to unexpected behavior.

---

## 📚 Summary Table

| Symbol | Meaning                        | Example             | Matches                        |
|--------|--------------------------------|---------------------|--------------------------------|
| `?`    | Optional character              | `/colou?r`          | `/color`, `/colour`           |
| `:`    | Named parameter                 | `/user/:id`         | `/user/42` → `id=42`           |
| `+`    | One or more repetitions         | `/go+gle`           | `/gogle`, `/google`           |
| `*`    | Wildcard (zero or more chars)   | `/file/*`           | `/file/a/b/c`                 |
| `()`   | Grouping (used with `?`, `+`)   | `/ab(cd)?e`         | `/abe`, `/abcde`              |


# 🧠 Using Regular Expressions in Express Route Paths

Express.js allows you to use **regular expressions** in route paths to match complex URL patterns.

---

## ✅ Syntax
```js
app.get(/regex/, handler);
```

---

## 🔍 Use Cases and Examples

### 1. Exact Pattern Match
```js
app.get(/^\/abc$/, (req, res) => {
  res.send('Exact match for /abc');
});
```
- ✅ Matches: `/abc`
- ❌ Does NOT match: `/abc/`, `/abcd`

---

### 2. Match Multiple Variations
```js
app.get(/^\/ab(cd|ef)$/, (req, res) => {
  res.send('Matched /abcd or /abef');
});
```
- ✅ Matches: `/abcd`, `/abef`

---

### 3. Case Insensitive Matching
```js
app.get(/^\/about$/i, (req, res) => {
  res.send('Case insensitive /about');
});
```
- ✅ Matches: `/about`, `/About`, `/ABOUT`

---

### 4. Match Optional Characters
```js
app.get(/^\/colou?r$/, (req, res) => {
  res.send('Color or Colour!');
});
```
- ✅ Matches: `/color`, `/colour`

---

### 5. Match Digits or Ranges
```js
app.get(/^\/user\/[0-9]+$/, (req, res) => {
  res.send('User ID route');
});
```
- ✅ Matches: `/user/123`, `/user/45678`

---

### 6. Match File Extensions
```js
app.get(/\.pdf$/, (req, res) => {
  res.send('PDF file route');
});
```
- ✅ Matches: `/report.pdf`, `/docs/summary.pdf`

---

### 7. Match Repeated Characters
```js
app.get(/^\/go+gle$/, (req, res) => {
  res.send('Google with repeated o');
});
```
- ✅ Matches: `/gogle`, `/google`, `/gooogle`, etc.

---

## 🧪 Example with Capturing Groups
```js
app.get(/^\/product\/(\d+)$/, (req, res) => {
  const productId = req.params[0]; // First captured group
  res.send(`Product ID is ${productId}`);
});
```
- Visiting `/product/42` → `Product ID is 42`

---

## ⚠️ Important Notes

- RegEx routes do **not** use `:params`. Use `req.params[0]` for captured groups.
- Always escape special characters like `/` and `.` when necessary.

---

## 📦 When to Use Regex

| Use Case                                       | Use Regex? |
|------------------------------------------------|------------|
| Simple dynamic routes like `/user/:id`         | ❌ No       |
| Case-insensitive routes like `/About` or `/about` | ✅ Yes   |
| Matching file types, repeated patterns, digits | ✅ Yes      |

# 🔍 Reading Query Params & Dynamic Routes in Express.js

## ✅ Reading Query Parameters

Query parameters appear after the `?` in a URL.

### Example URL:
```
http://localhost:3000/users?name=Jakir&age=25
```

### Code:
```js
app.get('/users', (req, res) => {
  const name = req.query.name; // 'Jakir'
  const age = req.query.age;   // '25'
  res.send(`Name: ${name}, Age: ${age}`);
});
```

---

## ✅ Reading Dynamic Route Parameters

Dynamic segments in routes use `:` and are accessed via `req.params`.

### Example URL:
```
http://localhost:3000/users/123
```

### Code:
```js
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});
```

---

## ✅ Combined Example

```js
app.get('/search/:type', (req, res) => {
  const type = req.params.type;
  const query = req.query.q;
  res.send(`Search Type: ${type}, Query: ${query}`);
});
```

### Example URL:
```
http://localhost:3000/search/books?q=javascript
```

**Output:**
```
Search Type: books, Query: javascript
```

---

## 🧠 Summary

| Type             | Method Used     | Example                         |
|------------------|------------------|----------------------------------|
| Query Params     | `req.query`     | `/search?q=term`               |
| Route Params     | `req.params`    | `/user/:id` → `/user/123`      |

## EPISODE 5 | MiddleWares and Error Handling

## 1️⃣ What is Middleware in Express.js?

Middleware functions in **Express.js** are functions that sit **between the request (req)** from the client and the **response (res)** sent by the server.  
They can **modify** the request/response, **run code**, **end the request-response cycle**, or **pass control to the next middleware** using `next()`.

### ✅ Key Points about Middleware:
- Executed **sequentially** in the order they are defined.
- Each middleware has access to `req`, `res`, and the `next()` function.
- Middleware can:
  - Run code (e.g., logging)
  - Modify `req` or `res`
  - End the request-response cycle (`res.send()`)
  - Pass control to the next middleware (`next()`)

### 🔹 Example:
\`\`\`javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('Middleware 1 executed');
  next(); // Pass control to next middleware
});

app.use((req, res) => {
  res.send('Response sent after middleware');
});
\`\`\`

---

## 2️⃣ How Express.js Handles Requests Behind the Scenes?

When a request comes in:
1. Express creates **`req`** (request) and **`res`** (response) objects.
2. The request goes through a **middleware stack** (functions defined via `app.use()`, `app.get()`, etc.).
3. Each middleware checks the request (URL/path or method) and decides:
   - If it should **handle it** (send a response), or
   - Call `next()` to pass it down the stack.
4. If no middleware sends a response, Express returns **404 Not Found**.

👉 Internally, Express uses Node.js’s **HTTP module** and builds on top of it for easier request/response handling.

---

## 3️⃣ Difference Between `app.use()` and `app.all()`

### ✅ `app.use()`
- Used to **mount middleware functions**.
- Works for **all HTTP methods** (GET, POST, PUT, DELETE, etc.).
- Can be **path-specific** or **global**.
- Typically used for **middleware** (e.g., authentication, logging, body-parsing).

#### 🔹 Example:
\`\`\`javascript
app.use('/users', (req, res, next) => {
  console.log('Middleware for /users route');
  next();
});
\`\`\`

---

### ✅ `app.all()`
- Handles **all HTTP methods** (**GET, POST, PUT, DELETE**) for a **specific route**.
- Useful when you want **one handler** for every method on a given route.
- Requires an **exact path match** and is mostly used for route handling.

#### 🔹 Example:
\`\`\`javascript
app.all('/test', (req, res) => {
  res.send(\`Handled \${req.method} request on /test\`);
});
\`\`\`

---

### 🔑 Quick Summary:

| Feature         | `app.use()`                              | `app.all()`                             |
|------------------|-----------------------------------------|-----------------------------------------|
| Purpose         | Mount middleware (global or path-based)  | Handle all HTTP methods for a route     |
| Path Matching   | Partial match allowed (`/users`)         | Exact path match required               |
| Use Case        | Logging, Auth, Parsing, Error handling   | Single handler for all HTTP methods     |


## EPISODE 6

# MongoDB Integration & Signup API

- **MongoDB Added:**  
  - Installed and configured Mongoose for MongoDB integration.
  - Created a new `database.js` config file for database connection logic.

- **User Schema:**  
  - Created a `user.js` model with fields: `firstName`, `lastName`, `emailId`, `password`, `gender`, `age`.

- **Signup API:**  
  - Added a `/signup` POST endpoint to create a new user with hardcoded data.
  - Connected the Express app to MongoDB using the new config.


  ## EP 07: User Model & API Improvements
- **Enhanced User Model:**
  - Added validation and `required: true` for important fields (like `firstName`, `emailId`, `password`).
  - Set `unique: true` for `emailId` to prevent duplicate registrations.
  - Added default values for `photoUrl` and `about`.
- **Improved Error Handling:**
  - Signup API now returns error messages if user creation fails (e.g., duplicate email).
- **User Management APIs:**
  - Added endpoints to:
    - Get user by email
    - Get all users (feed)
    - Delete user by ID
    - Update user profile (with allowed fields and skill limit)

## EP 08: API-Level Data Sanitization
- **Sanitization:**
  - Added checks in update API to only allow certain fields to be updated.
  - Limited the number of skills a user can add (max 5).
- **General:**
  - Used `express.json()` middleware for JSON body parsing.
  - Used async/await and try/catch for robust error handling.

---
**Tip:** If you get duplicate email errors, clean up your MongoDB collection and ensure the unique index is set on `emailId`.
