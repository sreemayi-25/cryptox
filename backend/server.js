console.log("🔥 THIS server.js FILE IS RUNNING 🔥");

import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

/* =========================
   CACHE SETUP
========================= */
const CACHE_TIME = 60 * 1000; // 60 seconds

const cache = {
  coins: {},
  trending: {},
  single: {},
  historical: {},
};

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("HELLO FROM EXPRESS – BACKEND WORKING");
});

/* =========================
   COIN LIST (HOME PAGE)
========================= */
app.get("/api/coins", async (req, res) => {
  const { currency = "usd" } = req.query;
  const now = Date.now();

  if (
    cache.coins[currency] &&
    now - cache.coins[currency].time < CACHE_TIME
  ) {
    return res.json(cache.coins[currency].data);
  }

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
        headers: {
          "User-Agent": "crypto-tracker-app",
        },
      }
    );

    cache.coins[currency] = {
      data: response.data,
      time: now,
    };

    res.json(response.data);
  } catch (error) {
    console.error("Coins error:", error.message);
    res.status(500).json({ error: "Rate limited. Try again later." });
  }
});

/* =========================
   TRENDING COINS
========================= */
app.get("/api/trending", async (req, res) => {
  const { currency = "usd" } = req.query;
  const now = Date.now();

  if (
    cache.trending[currency] &&
    now - cache.trending[currency].time < CACHE_TIME
  ) {
    return res.json(cache.trending[currency].data);
  }

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: currency,
          order: "gecko_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
        headers: {
          "User-Agent": "crypto-tracker-app",
        },
      }
    );

    cache.trending[currency] = {
      data: response.data,
      time: now,
    };

    res.json(response.data);
  } catch (error) {
    console.error("Trending error:", error.message);
    res.status(500).json({ error: "Rate limited. Try again later." });
  }
});

/* =========================
   SINGLE COIN DETAILS
========================= */
app.get("/api/single", async (req, res) => {
  const { id } = req.query;
  const now = Date.now();

  if (cache.single[id] && now - cache.single[id].time < CACHE_TIME) {
    return res.json(cache.single[id].data);
  }

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      {
        headers: {
          "User-Agent": "crypto-tracker-app",
        },
      }
    );

    cache.single[id] = {
      data: response.data,
      time: now,
    };

    res.json(response.data);
  } catch (error) {
    console.error("Single coin error:", error.message);
    res.status(500).json({ error: "Rate limited. Try again later." });
  }
});

/* =========================
   HISTORICAL CHART DATA
========================= */
app.get("/api/historical", async (req, res) => {
  const { id, days = 1, currency = "usd" } = req.query;
  const key = `${id}_${days}_${currency}`;
  const now = Date.now();

  if (
    cache.historical[key] &&
    now - cache.historical[key].time < CACHE_TIME
  ) {
    return res.json(cache.historical[key].data);
  }

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: currency,
          days,
        },
        headers: {
          "User-Agent": "crypto-tracker-app",
        },
      }
    );

    cache.historical[key] = {
      data: response.data,
      time: now,
    };

    res.json(response.data);
  } catch (error) {
    console.error("Historical error:", error.message);
    res.status(500).json({ error: "Rate limited. Try again later." });
  }
});

/* =========================
   START SERVER
========================= */
app.listen(5050, () => {
  console.log("🚀 Backend running on http://localhost:5050");
});
