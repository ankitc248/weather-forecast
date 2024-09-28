import { MoonIcon } from "lucide-react";
import { formatEpochDate } from "../../helpers/helpers";
export default function MoonBlock({ forecastDataDay, className = "" }) {
  return (
    <div className="flex flex-col border-2 text-xs border-black rounded overflow-hidden">
      <div className="flex-1 border-b-2 border-black text-left px-1 bg-black text-white">
        <span className="flex justify-between gap-1 items-center">
          Moon
          <MoonIcon size={12} strokeWidth={3} />
        </span>
      </div>
      <div className="flex-1 p-1">
        <div className="flex justify-between gap-2">
          <span className="">Rise</span>
          <span>{formatEpochDate(forecastDataDay.Moon.EpochRise).time}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Set</span>
          <span>{formatEpochDate(forecastDataDay.Moon.EpochSet).time}</span>
        </div>
      </div>
    </div>
  );
}
