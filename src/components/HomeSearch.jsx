import { useState, useEffect, useRef } from "react";
import { FrownIcon } from "lucide-react";
import { placeholderCities as cities } from "../../dummyData";
import Loader from "./Loader";
import {
  REACT_APP_WEATHER_API_KEY,
  REACT_APP_CITY_SEARCH_URL,
  REACT_APP_MIN_LENGTH_FOR_SEARCH,
} from "../../credentials";
import useLocalStorage from "../localStorageHook";
export default function HomeSearch() {
  const [placeholder, setPlaceholder] = useState(cities[0]);
  const usedCitiesRef = useRef([]);
  useEffect(() => {
    const updatePlaceholder = () => {
      if (usedCitiesRef.current.length === cities.length) {
        usedCitiesRef.current = [];
      }
      let newCity;
      do {
        newCity = cities[Math.floor(Math.random() * cities.length)];
      } while (usedCitiesRef.current.includes(newCity));

      setPlaceholder(newCity);
      usedCitiesRef.current.push(newCity);
    };
    const intervalId = setInterval(updatePlaceholder, 2000);

    return () => clearInterval(intervalId);
  }, []);
  const [searchTerm, setSearchTerm] = useState(""); // To store the input value
  const [cityData, setCityData] = useState(null); // To store API results
  const [error, setError] = useState(null); // To store errors
  const [loading, setLoading] = useState(false); // Loading state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [searched, setSearched] = useState(false);
  const cache = new Map(); // Cache to store the results

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.length >= REACT_APP_MIN_LENGTH_FOR_SEARCH) {
        setDebouncedSearchTerm(searchTerm); // Only set the search term after a delay if length >= 3
      } else {
        setCityData(null); // Clear city data if input length is below 3
      }
    }, 500); // 500ms debounce time

    return () => {
      clearTimeout(handler); // Clear the timeout on unmount or when searchTerm changes
    };
  }, [searchTerm]);

  const fetchCityData = async (city) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    // Check if the result is cached
    if (cache.has(city)) {
      setCityData(cache.get(city));
      setLoading(false);
      return;
    }

    try {
      const apiKey = REACT_APP_WEATHER_API_KEY;
      const citySearchUrl = `${REACT_APP_CITY_SEARCH_URL}?apikey=${apiKey}&q=${city}`;

      const response = await fetch(citySearchUrl);
      if (!response.ok) {
        if (response.status === 503) {
          throw new Error(
            "Service unavailable (503): Out of API requests. Please try again later."
          );
        } else if (response.status === 401) {
          throw new Error(
            "Unauthorized (401): API key may be invalid or expired. Please check your API key."
          );
        } else {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
      }

      const data = await response.json();
      setCityData(removeDuplicateResults(data));
      cache.set(city, removeDuplicateResults(data));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  // Call fetchCityData only when the debouncedSearchTerm changes
  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      fetchCityData(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length < REACT_APP_MIN_LENGTH_FOR_SEARCH) {
      setCityData(null);
      setSearched(false);
      setDebouncedSearchTerm(""); // Clear city data if input length is less than 3
    }
  };

  return (
    <div className="text-black font-medium text-center flex flex-col gap-10 justify-center items-center mb-40">
      <h1
        className="font-semibold text-black text-[3.5rem] tracking-tight [text-shadow:_2px_3px_0_rgb(255_255_255_/_80%)] animate__animated animate__bounceInDown"
        style={{ animation: "shadows 1.2s ease-in infinite;" }}
      >
        What&apos;s the Weather ?
      </h1>
      <div className="relative flex flex-col justify-start items-center w-full  animate__animated animate__bounceInUp">
        <div className="w-7 z-10 font-semibold border-2 border-black uppercase inline-flex items-center justify-center aspect-square rounded-b-none border-b-0 rounded-t-md bg-white">
          in
        </div>
        <div className="relative w-[clamp(300px,90dvw,600px)]  flex items-center justify-center flex-col z-50">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            className={
              "transition-all p-4 w-full h-14 text-lg rounded-xl bg-white border-2 border-black outline-none text-center font-medium shadow-dark" +
              (searched ? " rounded-b-none" : "")
            }
          />
          {searched && (
            <div className="absolute top-full bg-white w-full border-2 border-black border-t-0 max-h-[250px] rounded-b-lg overflow-auto shadow-dark">
              {loading ? (
                <div className="flex flex-col border-b-2 p-2 border-black last:border-b-0 items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <SearchResults cityData={cityData} error={error} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SearchResults = ({ error, cityData }) => {
  const [savedData, setSavedData] = useLocalStorage("wtw-saved-data-248", {});
  const handleResultClick = (city) => {
    const cityDetails = {
      Key: city.Key,
      Name: city.EnglishName,
      State: city.AdministrativeArea.EnglishName,
      Country: city.Country.EnglishName,
    };
    setSavedData({ ...savedData, defaultCity: cityDetails });
  };
  if (error) {
    return (
      <div className="flex border-b-2 p-2 items-center border-black last:border-b-0 text-left px-3 gap-2 justify-between flex-wrap bg-goodred">
        <span className="flex-1 text-white text-center items-center flex w-full justify-center flex-col gap-2">
          Uh oh! Something went wrong
          <span className="text-lg">{error}</span>
        </span>
      </div>
    );
  }
  if (cityData.length === 0) {
    return (
      <div className="flex border-b-2 p-2 items-center border-black last:border-b-0 text-left px-3 gap-2 justify-between flex-wrap">
        <span className="flex-1 text-center items-center flex w-full justify-center gap-2 text-neutral-500">
          No cities found <FrownIcon className="w-4 inline-block" size={20} />
        </span>
      </div>
    );
  } else {
    return cityData.map((city, index) => (
      <button
        type="button"
        key={index}
        onClick={() => handleResultClick(city)}
        className="group w-full flex border-b-2 p-2 items-center border-black last:border-b-0 text-left px-3 gap-2 justify-between flex-wrap hover:bg-goodpurple hover:text-black focus:bg-goodpurple focus:text-black outline-none "
      >
        <span className="">{city.EnglishName}</span>
        <div className="text-neutral-500 flex gap-2 group-[&:hover]:text-black group-[&:focus]:text-black">
          <span>{city.AdministrativeArea.EnglishName},</span>
          <span>{city.Country.EnglishName}</span>
        </div>
      </button>
    ));
  }
};

const removeDuplicateResults = (results) => {
  const uniqueSet = new Set();
  const cleanedResults = results.filter((item) => {
    const uniqueKey = `${item.EnglishName}-${item.AdministrativeArea.EnglishName}-${item.Country.EnglishName}`;
    if (uniqueSet.has(uniqueKey)) {
      return false;
    }
    uniqueSet.add(uniqueKey);
    return true;
  });

  return cleanedResults;
};
