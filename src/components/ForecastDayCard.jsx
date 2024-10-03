import FeelTempBlock from "./ForestDayCardBlocks/FeelTempblock";
import QualityBlock from "./ForestDayCardBlocks/QualityBlock";
import SunBlock from "./ForestDayCardBlocks/SunBlock";
import { formatEpochDate } from "../helpers/helpers";
import { DayBlock, NightBlock } from "./ForestDayCardBlocks/NightDayBlocks";
export default function ForecastDayCard({
  forecastDataDay,
  delay = 0,
  refreshed = false,
}) {
  const currentDateDetails = formatEpochDate(forecastDataDay.EpochDate);
  return (
    <div
      className="bg-white overflow-hidden font-semibold items-center animate__animated animate__bounceInUp shadow-dark-down border-2 min-w-[300px] border-black rounded-xl flex flex-col p-3 pt-2 gap-3"
      style={{ animationDelay: `${delay}s` }}
    >
      <span
        className={`absolute z-20 bg-black h-full top-0 -left-full w-full ${
          refreshed ? "animate-loadingSwipe" : ""
        }`}
      ></span>
      <div className="text-left w-full p-1 flex flex-col justify-between items-start flex-wrap">
        <p className="text-xl">
          {currentDateDetails.dayOfWeek}{" "}
          {currentDateDetails.isToday && (
            <span className="text-goodred text-sm">(Today)</span>
          )}
        </p>
        <p className="text-neutral-500">
          {currentDateDetails.day} {currentDateDetails.month}{" "}
          {currentDateDetails.year}
        </p>
      </div>
      <div className="flex flex-col xl:flex-row gap-4 w-full justify-between h-full">
        <div className="grid grid-cols-2 gap-2 w-full my-2 sm:my-0">
          <DayBlock
            weather={forecastDataDay.Day.IconPhrase}
            rainChance={forecastDataDay.Day.RainProbability}
            className="w-full"
          />
          <NightBlock
            weather={forecastDataDay.Night.IconPhrase}
            rainChance={forecastDataDay.Night.RainProbability}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 whitespace-nowrap w-full">
          <FeelTempBlock forecastDataDay={forecastDataDay} />
          <SunBlock forecastDataDay={forecastDataDay} />
          <QualityBlock forecastDataDay={forecastDataDay} />
          {/* <WindBlock forecastDataDay={forecastDataDay} /> */}
        </div>
      </div>
    </div>
  );
}
