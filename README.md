# 🛒 Bazar Dor (বাজার দর)

**Bazar Dor** is a robust and responsive Next.js web application designed to help users check the daily market prices of essential commodities in Bangladesh. It fetches real-time market data across various divisions and presents it with market-specific price breakdowns.

---

## 🚀 Live Demo
**Live Link:** [Insert Your Deployed Vercel/Netlify Link Here]

---

## ✨ Features

- **Real-time Price Tracking:** View the current day's average, minimum, and maximum prices for essential products (Rice, Dal, Oil, Vegetables, Fish, Meat, etc.).
- **Live Marquee Ticker:** A smooth scrolling ticker in the navigation bar displaying quick price updates and percentage changes.
- **Category & Sorting:** Filter products by categories and easily sort them by price (Low to High / High to Low).
- **Secure Authentication:** User signup and signin powered by **BetterAuth**. The system supports Email/Password as well as Social Logins (Google & GitHub).
- **Protected Routes:** Detailed market price breakdowns are exclusively accessible to logged-in users.
- **Profile Management:** Users can update their profile information (Name and Profile Picture) directly from the dashboard.
- **Error & Loading States:** Graceful skeleton loaders and empty state fallbacks for a smooth user experience.

---

## 🛠️ Technologies Used

- **Frontend:** Next.js (App Router), React, Tailwind CSS, DaisyUI, React Icons.
- **Backend/API Integration:** Next.js Server Components, Server Actions, REST API data fetching.
- **Authentication:** BetterAuth (Email/Password, Social Auth).
- **Database (Auth):** SQLite with Prisma ORM.
- **Notifications:** React Hot Toast.

---

## ⚙️ Getting Started (Local Development)

### 1. Prerequisites
Make sure you have Node.js (v18+) installed.

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root of your project and add the following configuration:
```env
NEXT_PUBLIC_API_URL=https://api.api-store.workers.dev/api/bazardor
DATABASE_URL="file:./dev.db"
BETTER_AUTH_SECRET="your_super_secret_random_string_here"
BETTER_AUTH_URL="http://localhost:3000"
```

### 4. Setup Database
Run the following commands to synchronize the database schema:
```bash
npx prisma db push
```

### 5. Run the Server
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---
*This project was created as part of the Assignment 07 challenges.*
