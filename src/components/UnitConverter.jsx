import { useUnit } from "../UnitProvider";
export default function UnitConverter() {
  const { unit, toggleUnit } = useUnit();
  return (
    <div
      className={`flex rounded-md border-2 bg-white border-black whitespace-nowrap text-black font-semibold overflow-hidden text-sm shadow-dark hover:shadow-dark-down transition-all animate__animated animate__bounceInDown`}
    >
      <button
        type="button"
        className={`p-1 px-2 hover:bg-goodpurple focus:bg-goodpurple flex-1 border-r-2 border-black ${
          unit === "imperial" ? "bg-goodpurple pointer-events-none" : ""
        }`}
        disabled={unit === "imperial"}
        onClick={() => toggleUnit("imperial")}
      >
        <span className="hidden sm:inline-block">Imperial</span> (°F)
      </button>
      <button
        type="button"
        className={`p-1 px-2 hover:bg-goodpurple focus:bg-goodpurple flex-1 border-black ${
          unit === "metric" ? "bg-goodpurple pointer-events-none" : ""
        }`}
        disabled={unit === "metric"}
        onClick={() => toggleUnit("metric")}
      >
        <span className="hidden sm:inline-block">Metric</span> (°C)
      </button>
    </div>
  );
}
