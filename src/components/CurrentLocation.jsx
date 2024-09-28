import { MapPinIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
export default function CurrentLocation({ savedData, setSavedData }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [cityChanged, setCityChanged] = useState(false);
  if (savedData.defaultCity === undefined) return null;
  const handleChangeCity = () => {
    setCityChanged(true);
    setTimeout(() => {
      setSavedData({
        ...savedData,
        defaultCity: undefined,
        currentWeather: undefined,
        fiveDayForecast: undefined,
      });
    }, 2000);
  };
  return (
    <div
      className={`flex border-2 shdaow-dark border-black rounded-md shadow-dark text-black bg-white font-semibold overflow-hidden w-full sm:w-auto animate__animated animate__bounceIn ${
        cityChanged ? "animate__hinge" : ""
      }`}
    >
      <div className="border-r-2 border-black p-1 flex items-center">
        <MapPinIcon size={20} strokeWidth={3} />
      </div>
      <div className="flex relative flex-col flex-1 p-1 pl-2 pr-5 text-left justify-center border-r-2 border-black">
        <span className="text-lg min-w-40">{savedData.defaultCity.Name}</span>
        <span className="text-neutral-500 text-sm">
          {savedData.defaultCity.State}, {savedData.defaultCity.Country}
        </span>
        {showTooltip && !cityChanged && (
          <span className="absolute right-3 bg-goodred rounded-md border-2 border-black p-1 px-2 text-sm animate-swipeup">
            Change city
          </span>
        )}
      </div>
      <button
        type="button"
        className="p-1 hover:bg-goodred focus:bg-goodred bg-white"
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
  );
}
