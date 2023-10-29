import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function HomePage() {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});

  const apiKey = "ca2346b0fbb54bec834155506232810"; // Your API key

  const [username, setUsername] = useState("");

  useEffect(() => {
    // This will run only on the client side after the initial render
    const storedUsername = localStorage.getItem("user");
    setUsername(storedUsername); // Move this line outside of useEffect
    // Fetch weather data for cities
    cities.forEach((city) => {
      fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData((prev) => ({ ...prev, [city]: data }));
        });
    });
  }, [cities]);

  const addCity = () => {
    if (cities.length < 5) {
      setCities([...cities, city]);
      setCity("");
    } else {
      alert("You can add a maximum of 5 cities.");
    }
  };

  const removeCity = (cityToRemove) => {
    setCities(cities.filter((city) => city !== cityToRemove));
  };

  return (
    <div>
      <Typography variant="h4">
        Welcome to the weather app {username}
      </Typography>

      <TextField
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button onClick={addCity}>Add City</Button>

      {cities.map((cityName) => (
        <Card key={cityName}>
          <CardContent>
            <Typography variant="h5">{cityName}</Typography>
            {weatherData[cityName] && (
              <>
                <Typography>
                  {weatherData[cityName].current.condition.text}
                </Typography>
                <img
                  src={weatherData[cityName].current.condition.icon}
                  alt="weather icon"
                />
              </>
            )}
            <IconButton onClick={() => removeCity(cityName)}>
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default HomePage;
