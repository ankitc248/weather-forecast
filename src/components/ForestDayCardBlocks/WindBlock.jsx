import { WindIcon } from "lucide-react";
export default function WindBlock({ forecastDataDay, className = "" }) {
  return (
    <div className="flex flex-col border-2 text-xs border-black rounded-md col-span-3">
      <div className="grid grid-cols-4 text-left pb-1 overflow-hidden">
        <span className="border-b-2 border-black px-1 col-span-2 bg-goodpurple">
          Wind
          <WindIcon size={12} strokeWidth={2} className="inline-block ml-1" />
        </span>
        <span className="border-b-2 border-black px-1 bg-goodpurple">Day</span>
        <span className="border-b-2 border-black px-1 bg-goodpurple">
          Night
        </span>
        <span className="px-1 pt-1 col-span-2">Speed</span>
        <span className="px-1 pt-1">
          {forecastDataDay.Day.Wind.Speed.Value}{" "}
          {forecastDataDay.Day.Wind.Speed.Unit}
        </span>
        <span className="px-1 pt-1">
          {forecastDataDay.Night.Wind.Speed.Value}{" "}
          {forecastDataDay.Night.Wind.Speed.Unit}
        </span>
        <span className="px-1 col-span-2">Direction</span>
        <span className="px-1">
          {forecastDataDay.Day.Wind.Direction.Degrees}
          {"°"}
          <span className="text-[9px]">
            ({forecastDataDay.Day.Wind.Direction.English})
          </span>
        </span>
        <span className="px-1">
          {forecastDataDay.Night.Wind.Direction.Degrees}
          {"°"}
          <span className="text-[9px]">
            ({forecastDataDay.Night.Wind.Direction.English})
          </span>
        </span>
      </div>
    </div>
  );
}
