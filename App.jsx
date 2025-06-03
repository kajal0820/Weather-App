
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState(""); // input value
  const [weatherData, setWeatherData] = useState(null); // fetched weather info
  const [error, setError] = useState(null);

  const apiKey = "931d9a0688d73e3af0451ed87dcfe233";

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      if (response.ok) {
        // parse and set the needed data
        setWeatherData({
          city: data.name,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
          pressure: data.main.pressure,
          cloudCover: data.weather[0].description,
        });
        setError(null);
      } else {
        setError(data.message);
        setWeatherData(null);
      }
    } catch (err) {
      setError("Error fetching data");
      setWeatherData(null);
    }
  };

  return (
    <div className="app">
      <div className="search-box">
        <input
          type="text"
          placeholder="CITY NAME"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-box">
          <h2>{weatherData.city}</h2>
          <h1>
            {weatherData.temperature}°<span>C</span>
          </h1>
          <p>
            <strong>Humidity:</strong> {weatherData.humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {weatherData.windSpeed} km/hr
          </p>
          <p>
            <strong>Sunrise:</strong> {weatherData.sunrise}
          </p>
          <p>
            <strong>Sunset:</strong> {weatherData.sunset}
          </p>
          <p>
            <strong>Pressure:</strong> {weatherData.pressure} mBar
          </p>
          <p>
            <strong>Cloud Cover:</strong> {weatherData.cloudCover}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
