export const url = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY, //Use your own API key here
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const Weather_API_URL = "https://api.openweathermap.org/data/2.5";
export const Weather_API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY; //Use your own API key here
