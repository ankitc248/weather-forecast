import { SunDimIcon } from "lucide-react";
import { formatEpochDate } from "../../helpers/helpers";
export default function SunBlock({ forecastDataDay, className = "" }) {
  return (
    <div className="flex flex-col border-2 text-xs border-black rounded-md overflow-hidden bg-white">
      <div className="flex-1 border-b-2 border-black text-left px-1 bg-goodyellow">
        <span className="flex justify-between gap-1 items-center">
          Sun
          <SunDimIcon size={12} strokeWidth={3} />
        </span>
      </div>
      <div className="flex-1 p-1">
        <div className="flex justify-between gap-2">
          <span className="">Rise</span>
          <span>{formatEpochDate(forecastDataDay.Sun.EpochRise).time}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Set</span>
          <span>{formatEpochDate(forecastDataDay.Sun.EpochSet).time}</span>
        </div>
      </div>
    </div>
  );
}
