import { useUnit } from "../UnitProvider";
export default function UnitConverter() {
  const { unit, toggleUnit } = useUnit();
  return (
    <div className="flex sm:flex-col rounded-md border-2 bg-white border-black whitespace-nowrap text-black font-semibold overflow-hidden text-sm shadow-dark hover:shadow-dark-down transition-all animate__animated animate__bounceIn">
      <button
        type="button"
        className={`p-1 px-2 hover:bg-goodpurple focus:bg-goodpurple flex-1 border-r-2 sm:border-r-0 sm:border-b-2 border-black ${
          unit === "imperial" ? "bg-goodpurple pointer-events-none" : ""
        }`}
        disabled={unit === "imperial"}
        onClick={() => toggleUnit("imperial")}
      >
        Imperial (°F)
      </button>
      <button
        type="button"
        className={`p-1 px-2 hover:bg-goodpurple focus:bg-goodpurple flex-1 border-black ${
          unit === "metric" ? "bg-goodpurple pointer-events-none" : ""
        }`}
        disabled={unit === "metric"}
        onClick={() => toggleUnit("metric")}
      >
        Metric (°C)
      </button>
    </div>
  );
}
