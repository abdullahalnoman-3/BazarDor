<div align="center">
  <img src="./public/logo-icon.png" alt="Bazar Dor Logo" width="100" />
  <h1>🛒 Bazar Dor (বাজার দর)</h1>
  <p><strong>বাংলাদেশের দৈনন্দিন বাজারের পণ্যের দাম এক নজরে</strong></p>
  
  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" /></a>
    <a href="https://sqlite.org/"><img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" /></a>
  </p>

  <p>
    <a href="https://assignment.hmnoman.com/"><strong>🚀 Live Demo</strong></a>
  </p>
</div>

---

## 📖 About the Project
**Bazar Dor** is a robust and responsive Next.js web application designed to help users check the daily market prices of essential commodities in Bangladesh. It fetches real-time market data across various divisions and presents it with market-specific price breakdowns.

## ✨ Key Features
- 📊 **Real-time Price Tracking:** View the current day's average, minimum, and maximum prices for essential products (Rice, Dal, Oil, Vegetables, Fish, Meat, etc.).
- 🚀 **Live Marquee Ticker:** A smooth scrolling ticker in the navigation bar displaying quick price updates and percentage changes.
- 🔍 **Category & Sorting:** Filter products by categories and easily sort them by price (Low to High / High to Low).
- 🔐 **Secure Authentication:** User signup and signin powered by **BetterAuth**. Supports Email/Password as well as Social Logins (Google & GitHub).
- 🛡️ **Protected Routes:** Detailed market price breakdowns are exclusively accessible to logged-in users.
- 👤 **Profile Management:** Users can update their profile information (Name and Profile Picture) directly from the dashboard.
- ⚡ **Optimized UI/UX:** Graceful skeleton loaders, empty state fallbacks, and beautiful UI components powered by DaisyUI.

---

## 🛠️ Technologies Used

| Category | Technology |
| :--- | :--- |
| **Frontend** | Next.js (App Router), React 19, Tailwind CSS, DaisyUI, React Icons |
| **Backend/API** | Next.js Server Components, Server Actions, REST API |
| **Authentication**| Better Auth (Email/Password, Google, GitHub) |
| **Database** | SQLite, Prisma ORM |
| **Deployment** | Standalone Node.js (cPanel Shared Hosting) |

---

## 🚀 Getting Started (Local Development)

### 1. Prerequisites
Make sure you have Node.js (v18+) installed.

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone <your-repo-url>
cd bazar-dor-app
npm install
```

### 3. Environment Variables
Create a `.env` file in the root of your project and add the following configuration:
```env
NEXT_PUBLIC_API_URL=https://api.api-store.workers.dev/api/bazardor
DATABASE_URL="file:./dev.db"

# Better Auth Config
BETTER_AUTH_SECRET="your_super_secret_random_string_here"
BETTER_AUTH_URL="http://localhost:3000"

# Social Auth Credentials (Optional for local testing)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

### 4. Setup Database
Synchronize the database schema with Prisma:
```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Server
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

<div align="center">
  <i>This project was created as part of Assignment 07. Developed with ❤️ by H.M. Noman.</i>
</div>
