import ForecastResults from "./components/ForecastResults";
import HomeSearch from "./components/HomeSearch";
import ResultsHeader from "./components/ResultsHeader";
import CurrentCondition from "./components/CurrentCondition";
import useLocalStorage from "./localStorageHook";
import IconBackground from "./components/IconBackground";
import ModeConverter from "./components/ModeConverter";
import UnitConverter from "./components/UnitConverter";
import "animate.css";
function App() {
  const [savedData, setSavedData] = useLocalStorage("wtw-saved-data-248", {});
  return (
    <div className="text-black font-medium flex justify-center">
      <div className="fixed top-4 flex flex-wrap gap-4 z-50 sm:right-4">
        <UnitConverter />
        <ModeConverter />
      </div>
      <IconBackground />
      {savedData.defaultCity === undefined ? (
        <HomeSearch />
      ) : (
        <div className="flex flex-col mt-5 min-h-dvh w-[clamp(300px,90dvw,1200px)]">
          <ResultsHeader savedData={savedData} setSavedData={setSavedData} />
          <div
            className={`flex flex-col lg:flex-row gap-4 mt-5 flex-wrap pb-52 ${
              savedData.changingCity ? "animate__animated animate__zoomOut" : ""
            }`}
          >
            <CurrentCondition locationKey={savedData.defaultCity.Key} />
            <ForecastResults locationKey={savedData.defaultCity.Key} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
