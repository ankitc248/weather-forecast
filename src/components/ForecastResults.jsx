import { forecastData } from "../../dummyData";
import ForecastDayCard from "./ForecastDayCard";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import {
  REACT_APP_WEATHER_API_KEY,
  REACT_APP_FIVE_DAY_FORECAST_URL,
} from "../../credentials";
import useLocalStorage from "../localStorageHook";

export default function ForecastResults({ locationKey }) {
  const [savedData, setSavedData] = useLocalStorage("wtw-saved-data-248", {});
  const [forecastData, setForecastData] = useState(null); // To store API results
  const [error, setError] = useState(null); // To store errors
  const [loading, setLoading] = useState(true); // Loading state

  const fetchForecastData = async (locationKey) => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = REACT_APP_WEATHER_API_KEY;
      const citySearchUrl = `${REACT_APP_FIVE_DAY_FORECAST_URL}/${locationKey}?apikey=${apiKey}&details=true`;

      const init = {
        method: "GET",
        // cache: "no-store",
      };

      const response = await fetch(citySearchUrl, init);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setForecastData(data);
      setSavedData({ ...savedData, fiveDayForecast: data });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecastData(locationKey);
  }, []);

  return (
    <div className="text-black font-medium flex-1 min-w-[300px]">
      <h1 className="text-2xl font-semibold mb-2 text-left">5 Day forecast</h1>
      {loading && (
        <div className="bg-white rounded-lg shadow-dark p-3 font-semibold border-2 border-black mb-4 flex items-center justify-between gap-2">
          Getting five day forecast...
          {loading && <Loader />}
        </div>
      )}
      {error && (
        <div className="bg-goodred text-start text-white rounded-lg flex-col shadow-dark-down p-3 font-medium border-2 border-black mb-4 flex justify-between gap-2 animate__animated animate__headShake">
          <span>Uh oh! Something went wrong...</span>
          <span className="text-xl">{error}</span>
        </div>
      )}
      {forecastData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 items-stretch justify-center">
          {forecastData.DailyForecasts.map((forecastDataDay, index) => (
            <ForecastDayCard
              forecastDataDay={forecastDataDay}
              key={index}
              delay={index * 0.1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
