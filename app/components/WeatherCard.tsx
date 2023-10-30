import React from "react";
import { useQuery } from "react-query";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const apiKey = process.env.WEATHER_API_KEY;

const fetchWeatherData = async (city: string) => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

interface WeatherCardProps {
  cityName: string;
  removeCity: (city: string) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ cityName, removeCity }) => {
  const {
    data: weatherData,
    error,
    isLoading,
  } = useQuery(["weatherData", cityName], () => fetchWeatherData(cityName));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data for {cityName}</p>;

  return (
    <Card key={cityName}>
      <CardContent>
        <Typography variant="h5">{cityName}</Typography>
        {weatherData?.current?.condition && (
          <>
            <Typography>{weatherData.current.condition.text}</Typography>
            <img src={weatherData.current.condition.icon} alt="weather icon" />
            <Typography>Temperature: {weatherData.current.temp_c}°C</Typography>
            <Typography>Humidity: {weatherData.current.humidity}%</Typography>
            <Typography>
              Precipitation: {weatherData.current.precip_mm}mm
            </Typography>
          </>
        )}
        <IconButton onClick={() => removeCity(cityName)}>
          <Delete />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
