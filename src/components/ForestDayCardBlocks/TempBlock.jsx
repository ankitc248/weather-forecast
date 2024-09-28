import { ThermometerIcon } from "lucide-react";
export default function TempBlock({ forecastDataDay, className = "" }) {
  return (
    <div className="flex flex-col border-2 text-xs border-black rounded overflow-hidden">
      <div className="flex-1 border-b-2 border-black text-left px-1 bg-goodred text-white">
        <span className="flex justify-between gap-1 items-center">
          Temp.
          <ThermometerIcon size={12} strokeWidth={3} />
        </span>
      </div>
      <div className="flex-1 p-1">
        <div className="flex justify-between gap-2">
          <span className="">Min</span>
          <span>{forecastDataDay.Temperature.Minimum.Value} °F</span>
        </div>
        <div className="flex justify-between">
          <span className="">Max</span>
          <span>{forecastDataDay.Temperature.Maximum.Value} °F</span>
        </div>
      </div>
    </div>
  );
}
