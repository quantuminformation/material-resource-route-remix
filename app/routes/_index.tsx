import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import WeatherCard from "~/components/WeatherCard";

const HomePage: React.FC = () => {
  const [cityInput, setCityInput] = useState("");
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
