import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

import CoinInfo from "../Components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../Components/CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        "@media (max-width:900px)": {
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      {/* SIDEBAR */}
      <Box
        sx={{
          width: "30%",
          "@media (max-width:900px)": { width: "100%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
          borderRight: "2px solid grey",
        }}
      >
        <img
          src={coin.image.large}
          alt={coin.name}
          height="200"
          style={{ marginBottom: 20 }}
        />

        <Typography variant="h3" fontWeight="bold" mb={2}>
          {coin.name}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "Montserrat",
            px: 3,
            textAlign: "justify",
          }}
        >
          {parse(coin.description.en.split(". ")[0])}.
        </Typography>

        <Box sx={{ alignSelf: "start", p: 3, width: "100%" }}>
          <Stat label="Rank" value={numberWithCommas(coin.market_cap_rank)} />

          <Stat
            label="Current Price"
            value={`${symbol} ${numberWithCommas(
              coin.market_data.current_price[currency.toLowerCase()]
            )}`}
          />

          <Stat
            label="Market Cap"
            value={`${symbol} ${numberWithCommas(
              coin.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
            )} M`}
          />
        </Box>
      </Box>

      {/* CHART */}
      <CoinInfo coin={coin} />
    </Box>
  );
};

/* Small reusable component */
const Stat = ({ label, value }) => (
  <Box sx={{ display: "flex", mb: 2 }}>
    <Typography variant="h5" fontWeight="bold">
      {label}:
    </Typography>
    &nbsp;&nbsp;
    <Typography variant="h5" fontFamily="Montserrat">
      {value}
    </Typography>
  </Box>
);

export default CoinPage;
