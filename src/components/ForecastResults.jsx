import { forecastDummyData } from "../../dummyData";
import ForecastDayCard from "./ForecastDayCard";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import {
  REACT_APP_WEATHER_API_KEY,
  REACT_APP_FIVE_DAY_FORECAST_URL,
} from "../../credentials";
import useLocalStorage from "../localStorageHook";
import { useMode } from "../ModeProvider";
import { RotateCcwIcon } from "lucide-react";
import { formatEpochDate } from "../helpers/helpers";
export default function ForecastResults({ locationKey }) {
  const mode = useMode().mode;
  const [savedData, setSavedData] = useLocalStorage("wtw-saved-data-248", {});
  const [forecastData, setForecastData] = useState(
    savedData.fiveDayForecast ? savedData.fiveDayForecast : null
  ); // To store API results
  const [error, setError] = useState(null); // To store errors
  const [loading, setLoading] = useState(mode !== "testing"); // Loading state

  const fetchForecastData = async (locationKey, refresh = false) => {
    setLoading(true);
    setError(null);
    setSavedData({ ...savedData, fiveDayForecastCheckTime: Date.now() });
    if (!refresh) {
      if (savedData.fiveDayForecast) {
        setTimeout(() => {
          setForecastData(savedData.fiveDayForecast);
          setLoading(false);
        }, 0);
        return;
      }
    }
    // setForecastData(null);
    if (mode === "testing") {
      setTimeout(() => {
        setForecastData(forecastDummyData);
        setSavedData({
          ...savedData,
          fiveDayForecast: forecastDummyData,
          fiveDayForecastCheckTime: Date.now(),
        });
        setLoading(false);
      }, 2000);
      return;
    }

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
      <h1 className="text-2xl font-semibold mb-2 animate__animated animate__bounceInUp flex gap-2 justify-between items-end">
        <div className="flex gap-1 items-center">
          <span>5 Day Forecast</span>

          {savedData.fiveDayForecastCheckTime && (
            <div className="relative hidden xl:flex items-center">
              <span className="rounded-full z-20 select-none peer font-black border-[2px] shadow-darkSmall border-black w-5 h-5 bg-white text-sm flex items-center justify-center cursor-pointer">
                i
              </span>
              <span className="absolute z-10 left-7 peer-[&:hover]:animate-swipeup peer-[&:hover]:z-40 opacity-0 text-xs sm:text-sm text-white p-1 px-2 rounded bg-black font-semibold truncate">
                Last checked at{" "}
                {formatEpochDate(savedData.fiveDayForecastCheckTime).time12} on{" "}
                {formatEpochDate(savedData.fiveDayForecastCheckTime).day +
                  " " +
                  formatEpochDate(savedData.fiveDayForecastCheckTime).month +
                  " " +
                  formatEpochDate(savedData.fiveDayForecastCheckTime).year}
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => fetchForecastData(locationKey, true)}
          className={`p-1 px-2 z-30 sm:hover:bg-goodpurple focus:bg-goodpurple border-2 border-black bg-white text-sm flex gap-1 items-center justify-center w-24 rounded-md shadow-darkSmall ${
            loading ? "pointer-events-none !bg-white" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <Loader className="h-[20px]" />
          ) : (
            <>
              Refresh <RotateCcwIcon size={14} strokeWidth={3} />
            </>
          )}
        </button>
      </h1>
      {error && (
        <div className="bg-goodred text-start text-white rounded-lg flex-col shadow-dark-down p-3 font-medium border-2 border-black mb-4 flex justify-between gap-2 animate__animated animate__headShake">
          <span>Uh oh! Something went wrong...</span>
          <span className="text-xl">{error}</span>
          <span className="text-sm">Out of API calls. Try demo mode.</span>
        </div>
      )}
      {forecastData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 items-stretch justify-center">
          {forecastData.DailyForecasts.map((forecastDataDay, index) => (
            <ForecastDayCard
              forecastDataDay={forecastDataDay}
              key={index}
              delay={(index + 1) * 0.25}
            />
          ))}
        </div>
      )}
    </div>
  );
}
