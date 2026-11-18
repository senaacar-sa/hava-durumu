import { useState } from "react";
import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  async function handleSearch(query) {
    if (query.trim() === "") return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=tr`,
      );
      const data = await response.json();

      if (!data.results) {
        throw new Error("Şehir bulunamadı 😕");
      }

      const city = data.results[0];
      const responseTemp = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`,
      );
      const weatherData = await responseTemp.json();

      setWeather({
        name: city.name,
        country: city.country,
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        wind: weatherData.current.wind_speed_10m,
        code: weatherData.current.weather_code,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
    
      <h1>🌤️ Hava Durumu</h1>

      <SearchForm loading={loading} onSearch={handleSearch} />

      {loading && <p className="message" >⏳ Yükleniyor...</p>}
      {error && <p className="message error">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    
    </div>
  );
}

export default App;
