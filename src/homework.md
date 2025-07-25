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