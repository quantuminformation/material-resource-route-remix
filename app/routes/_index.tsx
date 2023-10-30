import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import WeatherCard from "~/components/WeatherCard";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("user");
    if (!storedUsername) {
      navigate("/login");
    }
  }, []);

  const [cityInput, setCityInput] = useState("london");
  const [cities, setCities] = useState<string[]>([]);

  const addCity = () => {
    if (cityInput && !cities.includes(cityInput)) {
      setCities((prevCities) => [...prevCities, cityInput]);
      setCityInput("");
    } else {
      alert("City is either empty or already added");
    }
  };

  const removeCity = (cityToRemove: string) => {
    setCities((prevCities) =>
      prevCities.filter((city) => city !== cityToRemove)
    );
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" flexGrow={1}>
            Weather App
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <Typography variant="h4" marginTop={4} marginBottom={2}>
          Add a City
        </Typography>
        <TextField
          label="City"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addCity}
          sx={{ mt: 2 }}
        >
          Add City
        </Button>

        {cities.map((cityName) => (
          <WeatherCard
            key={cityName}
            cityName={cityName}
            removeCity={removeCity}
          />
        ))}
      </Container>
    </div>
  );
};

export default HomePage;
