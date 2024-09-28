import ForecastResults from "./components/ForecastResults";
import HomeSearch from "./components/HomeSearch";
import ResultsHeader from "./components/ResultsHeader";
import CurrentCondition from "./components/CurrentCondition";
import useLocalStorage from "./localStorageHook";
import IconBackground from "./components/IconBackground";
import "animate.css";
function App() {
  const [savedData, setSavedData] = useLocalStorage("wtw-saved-data-248", {});
  return (
    <div className="text-black font-medium">
      <IconBackground />
      {savedData.defaultCity === undefined ? (
        <HomeSearch />
      ) : (
        <div className="flex flex-col min-h-dvh w-[clamp(300px,95dvw,1200px)]">
          <ResultsHeader savedData={savedData} setSavedData={setSavedData} />
          <div className="flex flex-col lg:flex-row gap-4 relative flex-wrap pb-52">
            <CurrentCondition locationKey={savedData.defaultCity.Key} />
            <ForecastResults locationKey={savedData.defaultCity.Key} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
