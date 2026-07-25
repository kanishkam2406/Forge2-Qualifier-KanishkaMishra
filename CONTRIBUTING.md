# 🛠️ AgileBoard Developer & Expansion Guide

Welcome to the AgileBoard developer guide! This document explains how the repository is structured, how data flows between the frontend and backend, and how any developer can quickly onboard, extend features, or add new API endpoints.

---

## 📂 Repository Architecture & Folder Layout

```
agileboard/
├── frontend/                   # React 19 + Vite Frontend SPA
│   ├── src/
│   │   ├── components/         # Reusable UI components & modals
│   │   ├── db/                 # Offline LocalStorage fallback engine (localDB.js)
│   │   ├── pages/              # LandingPage.jsx & Board.jsx
│   │   ├── App.jsx             # Router & Vercel Analytics integration
│   │   ├── index.css           # Glassmorphism design system & CSS tokens
│   │   └── main.jsx            # Application entry point
│   ├── public/                 # Static assets & favicons
│   ├── package.json            # Frontend dependencies & scripts
│   └── vite.config.js          # Vite build configuration
├── backend/                    # Laravel PHP 8.3 REST API
│   ├── app/
│   │   ├── Http/Controllers/   # BoardController, CardController, etc.
│   │   └── Models/             # Board, BoardList, Card, Tag, Member
│   ├── database/               # SQLite migrations and seeders
│   └── routes/api.php          # REST API endpoints
├── evidence/                   # Submission screenshots & walkthrough video
│   ├── README.md               # Evidence index & labels
│   ├── walkthrough.mp4         # 38.8 MB Walkthrough Video
│   └── *.png                   # UI Evidence Screenshots
├── build.js                    # Universal build script for Vercel/Production
├── vercel.json                 # Vercel deployment configuration
├── ARCHITECTURE.md             # High-level architecture specification
├── CONTRIBUTING.md             # Developer onboarding & extension guide
├── agent-log.md                # Unedited AI agent execution log
├── hermes-config.yaml          # Hermes orchestration config
└── openclaw.json               # OpenClaw task execution config
```

---

## ⚙️ Development Workflow

### 1. Running Frontend (Offline / Standalone Mode)
The frontend is engineered with an automatic **Offline First** architecture. If no backend server is detected on `http://localhost:8000/api`, it seamlessly switches to the `localDB` engine stored in `src/db/localDB.js`.

```bash
cd frontend
npm install
npm run dev
```

### 2. Extending the Offline Database (`localDB.js`)
If you add a new model or feature (e.g., Card Comments or Task Attachments):
1. Open `frontend/src/db/localDB.js`.
2. Add your getters and setters (e.g., `getComments()`, `saveComments()`).
3. Store objects in `localStorage` under a unique prefix like `agile_comments`.

### 3. Extending the Laravel Backend API
If you have PHP 8.2+ and Composer installed:
1. Create a migration: `php artisan make:migration create_comments_table`
2. Create a model: `php artisan make:model Comment`
3. Add API routes in `backend/routes/api.php`:
   ```php
   Route::get('/cards/{card}/comments', [CommentController::class, 'index']);
   Route::post('/cards/{card}/comments', [CommentController::class, 'store']);
   ```
4. Update `frontend/src/pages/Board.jsx` fetch logic to call the new API endpoint with fallback to `localDB`.

---

## 🎨 Design System & CSS Tokens (`index.css`)

All styling uses standard CSS tokens defined at the root of `frontend/src/index.css`:
- `--bg-primary`, `--bg-secondary`: Canvas background colors.
- `--text-primary`, `--text-secondary`: High contrast editorial typography.
- `--accent-orange`: Cursor Orange (`#F54E00`).
- `--accent-green`: Success / Feature green (`#10B981`).
- `--accent-red`: Overdue crimson alert glow (`#EF4444`).

To add a new theme or modify glassmorphic blur effects, edit the variables in `index.css`.

---

## 🧪 Linting & Quality Checks
To run code quality and syntax validation checks:

```bash
cd frontend
npx oxlint
```

---

## 🚀 Building for Production / Vercel
To build the application manually or simulate the Vercel build:

```bash
node build.js
```
This script installs frontend dependencies, builds the Vite production bundle into `frontend/dist/`, and copies the final bundle to `./dist`.
