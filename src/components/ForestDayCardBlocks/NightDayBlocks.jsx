import { weatherIconPairs } from "../../../dummyData";
import { capitalizeEachWord } from "../../helpers/helpers";
export const NightBlock = ({ weather, rainChance = 0, className = "" }) => {
  return (
    <div
      className={
        "flex flex-col overflow-hidden border-0 border-black rounded-lg text-left " +
        className
      }
    >
      <span className="flex items-center justify-center gap-1 text-xs border-b-2 border-black pb-1 ">
        {/* <MoonIcon size={14} strokeWidth={3} /> */}
        Night
      </span>
      <div className="flex flex-col flex-1 gap-1 justify-between items-center w-full p-1">
        <span className="text-center">{weather}</span>
        <div className="flex gap-2">
          {weatherIconPairs.night[capitalizeEachWord(weather)] &&
            weatherIconPairs.night[capitalizeEachWord(weather)].map(
              (Icon, iconIndex) => (
                <Icon
                  size={30}
                  key={iconIndex}
                  className="inline-block w-10 h-10"
                />
              )
            )}
        </div>
        <span className="text-xs text-neutral-500 truncate">
          {rainChance}% chance of rain
        </span>
      </div>
    </div>
  );
};

export const DayBlock = ({ weather, rainChance = 0, className = "" }) => {
  return (
    <div
      className={
        "flex flex-col overflow-hidden border-0 border-black rounded-lg text-left " +
        className
      }
    >
      <span className="flex items-center justify-center gap-1 text-xs border-b-2 border-black pb-1">
        {/* <SunIcon size={16} strokeWidth={3} /> */}
        Day
      </span>
      <div className="flex flex-col flex-1 gap-1 justify-between items-center w-full p-1">
        <span className="text-center">{weather}</span>
        <div className="flex gap-2">
          {weatherIconPairs.day[capitalizeEachWord(weather)] &&
            weatherIconPairs.day[capitalizeEachWord(weather)].map(
              (Icon, iconIndex) => (
                <Icon
                  size={30}
                  key={iconIndex}
                  className="inline-block w-10 h-10"
                />
              )
            )}
        </div>
        <span className="text-xs text-neutral-500 truncate">
          {rainChance}% chance of rain
        </span>
      </div>
    </div>
  );
};
