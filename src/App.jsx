import { useState } from "react";
import "./App.css";
import Search from "./components/search/Search";
import Weather from "./components/weather/Weather";
import { Weather_API_KEY, Weather_API_URL } from "./api";
import Forecast from "./components/forecast/Forecast";

function App() {
  const [currWeather, setCurrWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  function handleSearchChange(searchData) {
    // console.log(searchData)
    const [lat, long] = searchData.value.split(" ");

    const weatherFetch = fetch(
      `${Weather_API_URL}/weather?lat=${lat}&lon=${long}&appid=${Weather_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${Weather_API_URL}/forecast?lat=${lat}&lon=${long}&appid=${Weather_API_KEY}&units=metric`
    );

    Promise.all([weatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  }

  // console.log(currWeather);
  // console.log(forecast);

  return (
    <div className="main-container">
      <Search onSearchChange={handleSearchChange} />
      {currWeather && <Weather data={currWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
