import { SparkleIcon } from "lucide-react";
export default function QualityBlock({ forecastDataDay, className = "" }) {
  return (
    <div className="flex flex-col border-2 text-xs border-black rounded-md col-span-2 overflow-hidden bg-white">
      <div className="flex-1 border-b-2 border-black text-left px-1 bg-goodgreen/85">
        <span className="flex justify-between gap-1 items-center">
          Quality
          <SparkleIcon size={12} strokeWidth={2} />
        </span>
      </div>
      <div className="flex-1 p-1">
        <div className="flex justify-between gap-2">
          <span className="">Air Quality</span>
          <span>{forecastDataDay.AirAndPollen[0].Category}</span>
        </div>
        <div className="flex justify-between">
          <span className="">UV Index</span>
          <span>{forecastDataDay.AirAndPollen[5].Category}</span>
        </div>
      </div>
    </div>
  );
}
