# Landed Cost Calculator

A **React + Firebase** web application for importers to calculate landed costs, save trips, and track history. Built with Vite, Tailwind CSS, Firebase Auth, and Cloud Firestore.

## Features

- **Email/Password Authentication** — Sign up and sign in via Firebase Auth.
- **Session Persistence** — Firebase `onAuthStateChanged` keeps users logged in across tabs and sessions.
- **Landed Cost Calculator** — Input product cost, travel expenses, shipping, exchange rate, and margin to see live computed results:
  - Total cost in USD
  - Total cost in local currency
  - Suggested selling price
- **Save Trips** — Persist calculations to Firestore under the authenticated user's UID.
- **Saved History** — Fetches and displays past trips in a responsive table.
- **Logout Cleanup** — Returns to the login screen on logout.

## Tech Stack

| Layer         | Technology                                  |
| ------------- | ------------------------------------------- |
| Framework     | React 18 + Vite 5                           |
| Styling       | Tailwind CSS (CDN) + custom CSS              |
| Auth          | Firebase Auth (email/password)               |
| Database      | Cloud Firestore (collection: `trips`)        |
| Icons / Fav   | Custom SVG calculator favicon                |

## Project Structure

```
├── index.html                # Vite entry HTML
├── package.json              # Dependencies & scripts
├── vite.config.js            # Vite + React plugin
├── public/
│   └── favicon.svg           # Calculator SVG favicon
├── src/
│   ├── main.jsx              # ReactDOM entry
│   ├── App.jsx               # Auth listener & page routing
│   ├── App.css               # Global styles
│   ├── firebase/
│   │   ├── config.js         # Firebase init (fill in your config)
│   │   ├── auth.js           # signUp, logIn, logOut, auth export
│   │   └── firestore.js      # saveTrip, getUserTrips
│   ├── components/
│   │   ├── LoginForm.jsx     # Email/password form with Sign In / Sign Up toggle
│   │   ├── Navbar.jsx        # Top nav with user email & Log Out
│   │   ├── Calculator.jsx    # Cost inputs, live summary, Save Trip
│   │   └── SavedHistory.jsx  # Trips table, loading/empty states
│   └── pages/
│       ├── AuthPage.jsx      # Auth wrapper page
│       └── DashboardPage.jsx # Dashboard orchestrator
```

## Setup

### 1. Create a Firebase Project

Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

### 2. Enable Authentication

- **Authentication → Sign-in method → Email/Password** → Enable.

### 3. Create a Firestore Database

- **Firestore Database → Create database** → Choose a location → Start in test mode (or configure rules below).

### 4. Configure Firebase

Open `src/firebase/config.js` and replace the placeholders with your project's credentials:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
}
```

You can find these values in **Project Settings → General → Your apps → Web app**.

### 5. Install & Run

```bash
npm install
npm run dev
```

This starts the Vite dev server (default `http://localhost:5173`).

### 6. Build for Production

```bash
npm run build
npm run preview
```

The build output goes to the `dist/` folder.

## Firestore Security Rules (Recommended)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /trips/{tripId} {
      allow read, write: if request.auth != null
        && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null
        && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Usage

1. **Sign Up** with email (password ≥ 6 chars).
2. **Enter costs** — product, travel, shipping, exchange rate, margin.
3. **Review** the live-updating summary (USD cost, local cost, suggested price).
4. **Click Save Trip** to persist to Firestore.
5. **View history** in the table below the calculator (click **Refresh** to reload).
6. **Log Out** via the top-right button to return to the login screen.

## License

MIT
