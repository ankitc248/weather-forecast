import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // Retrieve from localStorage or use the initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error retrieving data from localStorage", error);
      return initialValue;
    }
  });

  // Function to update localStorage and state
  const setValue = (value) => {
    try {
      // Save state
      setStoredValue(value);
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(value));
      // Dispatch storage event manually to inform all other hooks
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error saving data to localStorage", error);
    }
  };

  // Effect to listen to the 'storage' event
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error("Error retrieving data from localStorage", error);
      }
    };

    // Listen for storage changes across the window
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
