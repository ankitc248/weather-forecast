import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import useLocalStorage from "./localStorageHook";
const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [savedData, setSavedData] = useLocalStorage("wtw-saved-data-248", {});
  const [mode, setMode] = useState(() => {
    return savedData?.mode || "live";
  });
  const toggleMode = useCallback(
    (newMode) => {
      setMode(newMode);
    },
    [setMode]
  );
  useEffect(() => {
    setSavedData({ ...savedData, mode: mode });
  }, [mode]);

  const value = useMemo(
    () => ({ mode, setMode, toggleMode }),
    [mode, setMode, toggleMode]
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

export const useMode = () => {
  return useContext(ModeContext);
};
