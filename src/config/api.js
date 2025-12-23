const BASE_URL = "http://localhost:5050/api";

export const CoinList = (currency) =>
  `${BASE_URL}/coins?currency=${currency}`;

export const SingleCoin = (id) =>
  `${BASE_URL}/single?id=${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `${BASE_URL}/historical?id=${id}&days=${days}&currency=${currency}`;

export const TrendingCoins = (currency) =>
  `${BASE_URL}/trending?currency=${currency}`;
