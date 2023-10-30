import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import WeatherCard from "~/components/WeatherCard";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("user");
    if (!storedUsername) {
      // Redirect to the login page if there's no user in localStorage
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
      <Typography variant="h4">Add a City</Typography>
      <TextField
        label="City"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
      />
      <Button onClick={addCity}>Add City</Button>

      {cities.map((cityName) => (
        <WeatherCard
          key={cityName}
          cityName={cityName}
          removeCity={removeCity}
        />
      ))}
    </div>
  );
};

export default HomePage;
