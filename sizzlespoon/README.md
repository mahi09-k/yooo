# 🍳 SizzleSpoon — 100% Halal Recipe Web Application

A full-stack recipe website designed to match the editorial aesthetic of [Pinch of Yum](https://pinchofyum.com/) with 100% Halal recipes from around the world (Bangladeshi, Indian, Chinese, French, and Western cuisines).

---

## ⚡ Quick Start in Visual Studio Code

### Option 1: One Command (Recommended)
Open a terminal in the root folder (`Ctrl+\`` in VS Code) and run:
```bash
npm run dev
```
> This uses `concurrently` to run both the **Express Backend** (`http://localhost:5000`) and the **Vite Frontend** (`http://localhost:5173`) side-by-side in a single terminal with color-coded logs!

---

### Option 2: VS Code Tasks (`Ctrl + Shift + B`)
1. Press `Ctrl + Shift + B` (or go to **Terminal > Run Build Task...**).
2. Select **`🚀 Start Full-Stack App (Backend + Frontend)`**.
3. Done! Both servers launch automatically.

---

### Option 3: VS Code Run & Debug (`F5`)
1. Open the **Run and Debug** view (`Ctrl + Shift + D`).
2. Select **`🚀 Full-Stack (Backend + Frontend)`** from the dropdown.
3. Press `F5`. VS Code will start the backend Node debugger and launch the frontend in Chrome/Edge!

---

## 🗄️ Database & Pre-Seeded Halal Recipes

The project connects to a local MySQL instance:
- **Database:** `sizzlespoon`
- **Host / Port:** `localhost:3306`
- **Credentials:** configured in `backend/.env`

To re-seed the 100% Halal international recipes anytime:
```bash
npm run seed
```

---

## 🧪 Interactive API Testing inside VS Code
Open [`requests.http`](./requests.http) in VS Code. If you have the **REST Client** extension installed, you will see a clickable **"Send Request"** button above each endpoint to test the API directly!

---

## 📂 Project Architecture

```
sizzlespoon/
├── .vscode/               # VS Code workspace settings, tasks & debug configs
│   ├── launch.json        # F5 run & debug configurations
│   ├── tasks.json         # Ctrl+Shift+B task automation
│   ├── settings.json      # Workspace formatter & Tailwind intellisense
│   └── extensions.json    # Recommended VS Code plugins
├── backend/               # Node.js + Express + MySQL API
│   ├── config/            # MySQL connection pool
│   ├── controllers/       # Recipe, Auth, Category, Review controllers
│   ├── routes/            # Express routers
│   ├── seedInternational.js # 100% Halal recipe database seeder
│   └── server.js          # API entry point (:5000)
├── frontend/              # React 18 + Vite + Tailwind CSS
│   ├── public/images/     # Authentic high-resolution recipe photography
│   └── src/               # Pinch of Yum styled components & pages
├── requests.http          # One-click API tests for VS Code
└── package.json           # Root workspace scripts (npm run dev)
```
