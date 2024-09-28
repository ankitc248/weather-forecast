import CurrentLocation from "./CurrentLocation";
import UnitConverter from "./UnitConverter";
export default function ResultsHeader({ savedData, setSavedData }) {
  return (
    <div className="header justify-center sm:justify-between items-center sm:items-start flex gap-4 flex-wrap my-6">
      <SiteLogo />
      <CurrentLocation savedData={savedData} setSavedData={setSavedData} />
      <UnitConverter />
    </div>
  );
}

export function SiteLogo() {
  return (
    <div className="text-xl font-semibold absolute -top-1 bg-white border-2 rounded-b-lg p-1 px-2 border-black shadow-dark-down left-1/2 -translate-x-1/2 animate__animated animate__slideInDown">
      W<span className="text-sm font-black">T</span>W
    </div>
  );
}
