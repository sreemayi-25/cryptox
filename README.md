# CryptoX 🚀

A full-stack cryptocurrency tracking web application built using **React** and **Node.js (Express)** that displays real-time crypto prices, trending coins, and historical price charts using the **CoinGecko API**, with backend caching to handle API rate limits.

---

## 🔥 Features
- 📈 Live cryptocurrency prices
- 🌟 Trending cryptocurrencies
- 📊 Interactive historical price charts
- 🔍 Individual coin detail pages
- ⚡ Backend caching to prevent CoinGecko rate-limit issues
- 🌐 Clean and responsive UI using Material UI

---

## 🛠 Tech Stack

### Frontend
- React.js
- Material UI
- Axios
- Chart.js
- Context API

### Backend
- Node.js
- Express.js
- Axios
- CORS
- In-memory caching

### API
- CoinGecko Public API

---

## 📁 Project Structure
```
cryptox/
├── backend/
│   ├── server.js
│   └── package.json
│
├── public/
│   └── banner2.jpg
│
├── src/
│   ├── Components/
│   ├── Pages/
│   ├── config/
│   ├── CryptoContext.js
│   ├── App.js
│   └── index.js
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

---

### 🔹 Backend Setup
```
cd backend
npm install
node server.js
```

Backend runs on:
```
http://localhost:5050
```

---

### 🔹 Frontend Setup
```
cd ..
npm install
npm start
```

Frontend runs on:
```
http://localhost:3001
```

---

## ⚠️ Important Notes
- CoinGecko free API is **rate-limited**
- Backend caching is implemented to avoid repeated API calls
- Refresh the application **only once** during development to prevent 429 errors

---

## 📌 Future Enhancements
- 🔐 User authentication
- ⭐ Watchlist / favorites
- 🌙 Dark mode toggle
- 📱 Mobile-first UI improvements
- ☁️ Deployment using Vercel & Render

---

## ⭐ Acknowledgements
- CoinGecko for providing free cryptocurrency market data
- React and Express open-source communities
