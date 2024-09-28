import { weatherIconPairs } from "../../dummyData";
import { formatEpochDate, capitalizeEachWord } from "../helpers/helpers";
import CountUp from "react-countup";
import UnitBlock from "./UnitBlock";
import { SparklesIcon, WindIcon, Clock8Icon, CalendarFold } from "lucide-react";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import {
  REACT_APP_WEATHER_API_KEY,
  REACT_APP_CURRENT_CONDITIONS_URL,
} from "../../credentials";
import useLocalStorage from "../localStorageHook";

export default function CurrentCondition({ locationKey }) {
  // const currentWeather = currentData[0];
  const [savedData, setSavedData] = useLocalStorage("wtw-saved-data-248", {});
  const [weatherData, setWeatherData] = useState(null); // To store API results
  const [error, setError] = useState(null); // To store errors
  const [loading, setLoading] = useState(true); // Loading state

  const fetchWeatherData = async (locationKey) => {
    setLoading(true);
    setError(null);

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
    }
  };

  useEffect(() => {
    fetchWeatherData(locationKey);
  }, []);

  return (
    <div className="text-black font-medium flex flex-1 flex-col text-left xl:sticky top-2 h-full md:w-auto min-w-[300px]">
      <h1 className="text-2xl font-semibold mb-2">Current weather</h1>
      {loading && (
        <div className="bg-white rounded-lg shadow-dark p-3 font-semibold border-2 border-black mb-4 flex items-center justify-between gap-2">
          Getting current weather...
          {loading && <Loader />}
        </div>
      )}
      {error && (
        <div className="bg-goodred text-white rounded-lg flex-col shadow-dark-down p-3 font-medium border-2 border-black mb-4 flex justify-between gap-2 animate__animated animate__headShake">
          <span>Uh oh! Something went wrong...</span>
          <span className="text-xl">{error}</span>
        </div>
      )}
      {weatherData && (
        <div className="flex flex-col font-semibold text-sm min-w-[300px] bg-white border-2 border-black rounded-xl shadow-dark mb-10 overflow-hidden">
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
    <div className="flex justify-between gap-4 flex-wrap items-center p-1">
      <span className="text-center truncate text-xl">{precipitationType}</span>
      <div className="flex gap-2">
        {weatherIconPairs.day[capitalizeEachWord(precipitationType)].map(
          (Icon, iconIndex) => (
            <Icon size={30} key={iconIndex} className="inline-block w-8 h-8" />
          )
        )}
      </div>
    </div>
  );
};

const WeatherBlock = ({ weather, dayNight, className = "" }) => {
  return (
    <div className="flex gap-4 flex-wrap justify-between items-center p-1">
      <span className="text-center truncat text-2xl">{weather}</span>
      <div className="flex gap-2">
        {weatherIconPairs[dayNight][capitalizeEachWord(weather)] &&
          weatherIconPairs[dayNight][capitalizeEachWord(weather)].map(
            (Icon, iconIndex) => (
              <Icon
                size={30}
                key={iconIndex}
                className="inline-block w-8 h-8"
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
