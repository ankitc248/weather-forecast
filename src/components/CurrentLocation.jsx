import { MapPinIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import useLocalStorage from "../localStorageHook";
export default function CurrentLocation({ savedData, setSavedData }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [cityChanged, setCityChanged] = useState(false);
  const [fiveDaySavedData, setFiveDaySavedData] = useLocalStorage(
    "wtw-saved-data-248-fiveday",
    {}
  );
  if (savedData.defaultCity === undefined) return null;
  const handleChangeCity = () => {
    setCityChanged(true);
    setSavedData({ ...savedData, changingCity: true });
    setTimeout(() => {
      setSavedData({
        ...savedData,
        defaultCity: undefined,
        currentWeather: undefined,
        changingCity: undefined,
        currentWeatherCheckTime: undefined,
      });
      setFiveDaySavedData({
        ...fiveDaySavedData,
        fiveDayForecast: undefined,
        fiveDayForecastCheckTime: undefined,
      });
    }, 2000);
  };
  return (
    <div className="relative flex items-center">
      <div
        className={`flex border-2 min-w-[300px] shdaow-dark border-black rounded-md shadow-dark text-black bg-white font-semibold overflow-hidden w-full sm:w-auto animate__animated ${
          cityChanged ? "animate__hinge" : "animate__bounceInDown"
        }`}
      >
        <div className="border-r-2 border-black p-1 flex items-center">
          <MapPinIcon size={20} strokeWidth={3} />
        </div>
        <div className="flex relative flex-col flex-1 p-1 pl-2 pr-5 text-center justify-center border-r-2 border-black">
          <span className="text-lg min-w-40">{savedData.defaultCity.Name}</span>
          <span className="text-neutral-500 text-sm">
            {savedData.defaultCity.State}, {savedData.defaultCity.Country}
          </span>
        </div>
        <button
          type="button"
          className={`p-1 hover:bg-goodred focus:bg-goodred bg-white ${
            cityChanged && "bg-goodred"
          }`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={handleChangeCity}
          disabled={cityChanged}
        >
          {/* Switch */}
          <ChevronsUpDownIcon
            size={20}
            strokeWidth={3}
            className="inline-block"
          />
        </button>
      </div>
      {showTooltip && !cityChanged && (
        <span className="absolute left-[104%] hidden sm:flex whitespace-nowrap shadow-darkSmall bg-goodred rounded-md border-2 border-black p-1 px-2 text-sm font-semibold animate-swipeup">
          Change city
        </span>
      )}
    </div>
  );
}
