import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

function Header() {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  return (
    <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
      <Container>
        <Toolbar>
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            sx={{
              flex: 1,
              color: "gold",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Crypto Hunter
          </Typography>

          <Box>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              sx={{
                width: 100,
                height: 40,
                color: "white",
                border: "1px solid white",
              }}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
