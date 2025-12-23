import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";
import SelectButton from "./SelectButton";

/* ✅ Register Chart.js components (REQUIRED for v3+) */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);

  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );

      // SAFETY: ensure prices is always an array
      setHistoricData(Array.isArray(data?.prices) ? data.prices : []);
    } catch (error) {
      console.error("Historical chart error:", error.message);
      setHistoricData([]); // prevent crash
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coin?.id) {
      fetchHistoricData();
    }
  }, [days, currency, coin?.id]);

  return (
    <Box
      sx={{
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 3,
        p: 5,
        "@media (max-width:900px)": {
          width: "100%",
          mt: 0,
          p: 2,
        },
      }}
    >
      {loading ? (
        <CircularProgress sx={{ color: "gold" }} size={250} thickness={1} />
      ) : Array.isArray(historicData) && historicData.length > 0 ? (
        <>
          <Line
            data={{
              labels: historicData.map((point) => {
                const date = new Date(point[0]);
                return days === 1
                  ? date.toLocaleTimeString()
                  : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicData.map((point) => point[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              responsive: true,
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              mt: 3,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                selected={day.value === days}
                onClick={() => setDays(day.value)}
              >
                {day.label}
              </SelectButton>
            ))}
          </Box>
        </>
      ) : (
        <Typography sx={{ color: "gold", mt: 4 }}>
          No chart data available
        </Typography>
      )}
    </Box>
  );
};

export default CoinInfo;
