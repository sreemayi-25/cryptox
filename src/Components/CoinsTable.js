import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Pagination,
  Box,
} from "@mui/material";

import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";

/* helper */
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();

  const fetchCoins = async (signal) => {
    try {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency), { signal });
      setCoins(data);
    } catch (error) {
      console.error("Coins API error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    // small delay → prevents CoinGecko burst blocking
    const timer = setTimeout(() => {
      fetchCoins(controller.signal);
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort(); // cancels duplicate requests (React 18)
    };
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ my: 2, fontFamily: "Montserrat" }}>
        Cryptocurrency Prices by Market Cap
      </Typography>

      <TextField
        label="Search For a Crypto Currency.."
        variant="outlined"
        sx={{ mb: 3, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        {loading ? (
          <LinearProgress sx={{ backgroundColor: "gold" }} />
        ) : (
          <Table>
            <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    key={head}
                    align={head === "Coin" ? "left" : "right"}
                    sx={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow
                      key={row.name}
                      hover
                      sx={{
                        cursor: "pointer",
                        backgroundColor: "#16171a",
                        "&:hover": { backgroundColor: "#131111" },
                        fontFamily: "Montserrat",
                      }}
                      onClick={() => navigate(`/coins/${row.id}`)}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ display: "flex", gap: 2 }}
                      >
                        <img
                          src={row.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ textTransform: "uppercase", fontSize: 22 }}>
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </Box>
                      </TableCell>

                      <TableCell align="right">
                        {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          color: profit ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>

                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Pagination
        count={Math.ceil(handleSearch().length / 10)}
        sx={{
          py: 3,
          display: "flex",
          justifyContent: "center",
          "& .MuiPaginationItem-root": { color: "gold" },
        }}
        onChange={(_, value) => {
          setPage(value);
          window.scrollTo(0, 450);
        }}
      />
    </Container>
  );
}
