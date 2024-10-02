import { currentData, weatherIconPairs } from "../../dummyData";
import { formatEpochDate, capitalizeEachWord } from "../helpers/helpers";
import CountUp from "react-countup";
import UnitBlock from "./UnitBlock";
import {
  SparklesIcon,
  WindIcon,
  Clock8Icon,
  CalendarFold,
  RotateCcwIcon,
  XIcon,
} from "lucide-react";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { useMode } from "../ModeProvider";
import useLocalStorage from "../localStorageHook";

const REACT_APP_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "";
const REACT_APP_CURRENT_CONDITIONS_URL =
  import.meta.env.VITE_CURRENT_CONDITIONS_URL || "";

export default function CurrentCondition({ locationKey }) {
  const mode = useMode().mode;
  const [savedData, setSavedData] = useLocalStorage("wtw-saved-data-248", {});
  const [weatherData, setWeatherData] = useState(
    savedData.currentWeather ? savedData.currentWeather : null
  ); // To store API results
  const [error, setError] = useState(null); // To store errors
  const [loading, setLoading] = useState(true); // Loading state
  const [refreshLoading, setRefreshLoading] = useState(false);

  const fetchWeatherData = async (locationKey, refresh = false) => {
    setLoading(true);
    setError(null);
    if (!refresh) {
      if (savedData.currentWeather) {
        setTimeout(() => {
          setWeatherData(savedData.currentWeather);
          setLoading(false);
        }, 0);
        return;
      }
    }
    setSavedData({ ...savedData, currentWeatherCheckTime: Date.now() });
    if (mode === "testing") {
      setTimeout(() => {
        setWeatherData(currentData[0]);
        setSavedData({
          ...savedData,
          currentWeather: currentData[0],
          currentWeatherCheckTime: Date.now(),
        });
        setLoading(false);
        setRefreshLoading(false);
      }, 2000);
      return;
    }

    try {
      const apiKey = REACT_APP_WEATHER_API_KEY;
      const citySearchUrl = `${REACT_APP_CURRENT_CONDITIONS_URL}/${locationKey}?apikey=${apiKey}&details=true`;
      const init = {
        method: "GET",
        // cache: "no-store",
      };

      const response = await fetch(citySearchUrl, init);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setWeatherData(data[0]);
      setSavedData({ ...savedData, currentWeather: data[0] });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(locationKey);
  }, []);

  return (
    <div className="text-black xl:self-start font-medium flex flex-1 flex-col text-left xl:sticky xl:top-2 md:w-auto min-w-[300px]">
      <h1 className="text-3xl font-bold mb-2 animate__animated animate__bounceInLeft flex gap-2 justify-between items-end relative">
        <div className="flex gap-1 items-center">
          <span className="tracking-tight">Current weather</span>
          {savedData.currentWeatherCheckTime && (
            <div className="relative hidden xl:flex items-center">
              <span className="rounded-full z-20 select-none peer font-black border-[2px] shadow-darkSmall border-black w-5 h-5 bg-white text-sm flex items-center justify-center cursor-pointer">
                i
              </span>
              <span className="absolute z-10 left-7 peer-[&:hover]:animate-swipeup peer-[&:hover]:z-40 opacity-0 text-xs sm:text-sm text-white p-1 px-2 rounded bg-black font-semibold truncate">
                Last checked at{" "}
                {formatEpochDate(savedData.currentWeatherCheckTime).time12} on{" "}
                {formatEpochDate(savedData.currentWeatherCheckTime).day +
                  " " +
                  formatEpochDate(savedData.currentWeatherCheckTime).month +
                  " " +
                  formatEpochDate(savedData.currentWeatherCheckTime).year}
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            fetchWeatherData(locationKey, true);
            setRefreshLoading(true);
          }}
          className={`p-1 font-semibold px-2 z-30 sm:hover:bg-goodpurple focus:bg-goodpurple border-2 border-black bg-white text-sm flex gap-1 items-center justify-center w-24 rounded-md shadow-darkSmall ${
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
        <div className="relative bg-goodred text-white rounded-lg flex-col shadow-dark-down p-3 font-medium border-2 border-black mb-4 flex justify-between gap-2 animate__animated animate__headShake">
          <span>Uh oh! Something went wrong...</span>
          <span className="text-xl">{error}</span>
          <span className="text-sm">Out of API calls. Try demo mode.</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className={`absolute top-2 right-2 font-semibold z-30 sm:hover:bg-goodpurple focus:bg-goodpurple border-2 border-black text-black bg-white text-sm flex gap-1 items-center justify-center rounded-full shadow-darkSmall aspect-square p-0.5`}
          >
            <XIcon size={20} strokeWidth={2.5} />
          </button>
        </div>
      )}
      {refreshLoading && (
        <div
          className="bg-white rounded-lg flex-col font-semibold shadow-dark-down p-3 border-2 border-black mb-4 flex justify-between gap-2 animate__animated animate__slideInUp"
          style={{ animationDuration: "0.2s" }}
        >
          <span>Getting current weather...</span>
        </div>
      )}
      {weatherData && (
        <div className="flex flex-col font-semibold text-sm min-w-[300px] bg-white border-2 border-black rounded-xl shadow-dark-down mb-10 overflow-hidden animate__animated animate__bounceInLeft">
          <div className="border-b-2 border-black p-2 w-full flex justify-between text-lg items-center gap-2 flex-wrap">
            <span className="flex gap-1 items-center">
              <Clock8Icon size={16} strokeWidth={3} />
              {formatEpochDate(weatherData.EpochTime).time12}
            </span>
            <span className="text-sm text-neutral-500 flex gap-1 items-center">
              <CalendarFold size={14} strokeWidth={3} />
              {formatEpochDate(weatherData.EpochTime).day}{" "}
              {formatEpochDate(weatherData.EpochTime).month}{" "}
              {formatEpochDate(weatherData.EpochTime).year}
            </span>
          </div>
          <div className="p-3 w-full flex flex-col gap-2">
            <div className="flex gap-6 items-start flex-wrap sm:justify-between">
              <div className="flex flex-col">
                <span className="border-b-2 border-black pb-1">Temp.</span>
                <span className="text-4xl">
                  {weatherData.RealFeelTemperature.Imperial.Phrase}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="border-b-2 border-black pb-1">
                  Actual Temp.
                </span>
                <UnitBlock
                  type={"temperature"}
                  value={weatherData.Temperature.Imperial.Value}
                  className="text-4xl min-w-[110px]"
                  unitClassName="text-[20px]"
                />
              </div>
              <div className="flex flex-col">
                <span className="border-b-2 border-black pb-1">Feels like</span>
                <UnitBlock
                  type={"temperature"}
                  value={weatherData.RealFeelTemperature.Imperial.Value}
                  className="text-4xl min-w-[110px]"
                  unitClassName="text-[20px]"
                />
              </div>
              <div className="flex flex-col">
                <span className="border-b-2 border-black pb-1 min-w-[80px]">
                  Humidity
                </span>
                <span>
                  <CountUp
                    end={weatherData.RelativeHumidity}
                    className="text-4xl"
                  />
                  <span className="text-[20px]">%</span>
                </span>
              </div>
              {/* <div className="flex flex-col">
              <span className="border-b-2 border-black pb-1">Pressure</span>
              <UnitBlock
                type={"pressure"}
                value={weatherData.Pressure.Imperial.Value}
                className="text-4xl min-w-[100px]"
                unitClassName="text-[20px]"
              />
            </div> */}
            </div>
            <div className="flex gap-6 mb-2">
              <div className="flex flex-col text-left flex-1">
                <span className="border-b-2 border-black pb-1">Atmosphere</span>
                <WeatherBlock
                  weather={weatherData.WeatherText}
                  dayNight={weatherData.IsDayTime ? "day" : "night"}
                />
              </div>
            </div>
            {weatherData.HasPrecipitation && (
              <div className="flex gap-6">
                <div className="flex flex-col text-left flex-1">
                  <span className="border-b-2 border-black pb-1 flex justify-between items-center">
                    Precipitaion
                    <UnitBlock
                      type={"precipitation"}
                      value={
                        weatherData.PrecipitationSummary.Precipitation.Imperial
                          .Value
                      }
                    />
                  </span>
                  <PrecipitationBlock
                    precipitationType={weatherData.PrecipitationType}
                  />
                </div>
              </div>
            )}
            <div className="flex gap-4 flex-wrap mt-1">
              <CurrentWindBlock currentWeather={weatherData} />
              <CurrentMiscBlock currentWeather={weatherData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const PrecipitationBlock = ({ precipitationType }) => {
  return (
    <div className="flex justify-between gap-4 flex-wrap items-center p-1 px-0">
      <span className="text-center truncate text-2xl tracking-tight">
        {precipitationType}
      </span>
      <div className="flex gap-2">
        {weatherIconPairs.day[capitalizeEachWord(precipitationType)].map(
          (Icon, iconIndex) => (
            <Icon
              size={30}
              key={iconIndex}
              className="inline-block w-10 h-10"
            />
          )
        )}
      </div>
    </div>
  );
};

const WeatherBlock = ({ weather, dayNight, className = "" }) => {
  return (
    <div className="flex gap-4 flex-wrap justify-between items-center p-1 px-0">
      <span className="text-center truncat text-3xl tracking-tight">
        {weather}
      </span>
      <div className="flex gap-2">
        {weatherIconPairs[dayNight][capitalizeEachWord(weather)] &&
          weatherIconPairs[dayNight][capitalizeEachWord(weather)].map(
            (Icon, iconIndex) => (
              <Icon
                size={30}
                key={iconIndex}
                className="inline-block w-10 h-10"
              />
            )
          )}
      </div>
    </div>
  );
};

function CurrentWindBlock({ currentWeather, className = "" }) {
  return (
    <div className="flex flex-col border-2 text-sm border-black rounded-md overflow-hidden bg-white flex-1">
      <div className="flex-1 border-b-2 border-black text-left px-1 bg-goodblue">
        <span className="flex justify-between gap-1 items-center">
          Wind
          <WindIcon size={12} strokeWidth={3} />
        </span>
      </div>
      <div className="flex-1 p-1">
        <div className="flex justify-between gap-2">
          <span className="">Speed</span>
          <UnitBlock
            type={"speed"}
            value={currentWeather.Wind.Speed.Imperial.Value}
          />
        </div>
        <div className="flex justify-between">
          <span className="">Direction</span>
          <span>
            {currentWeather.Wind.Direction.Degrees}° (
            {currentWeather.Wind.Direction.English}){" "}
          </span>
        </div>
      </div>
    </div>
  );
}

function CurrentMiscBlock({ currentWeather, className = "" }) {
  return (
    <div className="flex flex-col border-2 text-sm border-black rounded-md overflow-hidden bg-white flex-1">
      <div className="flex-1 border-b-2 border-black text-left px-1 bg-goodgreen/90">
        <span className="flex justify-between gap-1 items-center">
          Misc
          <SparklesIcon size={12} strokeWidth={3} />
        </span>
      </div>
      <div className="flex-1 p-1">
        <div className="flex justify-between gap-2">
          <span className="">Visibility</span>
          <UnitBlock
            type={"distance"}
            value={currentWeather.Visibility.Imperial.Value}
          />
        </div>
        <div className="flex justify-between">
          <span className="">UV Index</span>
          <span>
            {currentWeather.UVIndex} (
            {currentWeather.IsDayTime ? currentWeather.UVIndexText : "Night"})
          </span>
        </div>
      </div>
    </div>
  );
}
