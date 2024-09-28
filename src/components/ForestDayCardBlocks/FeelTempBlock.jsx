import { ThermometerIcon } from "lucide-react";
import UnitBlock from "../UnitBlock";
export default function FeelTempBlock({ forecastDataDay, className = "" }) {
  return (
    <div className="flex flex-col border-2 text-xs border-black rounded-md col-span-3 overflow-hidden">
      <div className="grid grid-cols-4 text-left pb-1 overflow-hidden bg-white">
        <span className="border-b-2 border-black px-1 bg-goodred/80 flex items-center justify-between col-span-4">
          Temp.
          <ThermometerIcon size={11} strokeWidth={3} />
        </span>
        <span className="px-1 pt-1">Min</span>
        <span className="px-1 pt-1 text-right">
          <UnitBlock
            type={"temperature"}
            value={forecastDataDay.RealFeelTemperature.Minimum.Value}
          />
        </span>
        <span className="px-1 pt-1 col-span-2 text-right">
          {forecastDataDay.RealFeelTemperature.Minimum.Phrase}
        </span>
        <span className="px-1">Max</span>
        <span className="px-1 text-right">
          <UnitBlock
            type={"temperature"}
            value={forecastDataDay.RealFeelTemperature.Maximum.Value}
          />
        </span>
        <span className="px-1 col-span-2 text-right">
          {forecastDataDay.RealFeelTemperature.Maximum.Phrase}
        </span>
      </div>
    </div>
  );
}
