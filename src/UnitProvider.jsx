import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import useLocalStorage from "./localStorageHook";
const UnitContext = createContext();

export const UnitProvider = ({ children }) => {
  const [savedData, setSavedData] = useLocalStorage("wtw-saved-data-248", {});
  const [unit, setUnit] = useState(() => {
    return savedData?.unit || "metric";
  });
  const toggleUnit = useCallback(
    (newUnit) => {
      setUnit(newUnit);
    },
    [setUnit]
  );
  useEffect(() => {
    setSavedData({ ...savedData, unit: unit });
  }, [unit]);

  const value = useMemo(
    () => ({ unit, setUnit, toggleUnit }),
    [unit, setUnit, toggleUnit]
  );

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
};

export const useUnit = () => {
  return useContext(UnitContext);
};
