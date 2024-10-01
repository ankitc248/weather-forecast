import { useState, useEffect } from "react";
export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      className={`fixed w-full left-0 min-h-6 flex items-center justify-center transition-all bottom-0 translate-y-full bg-goodred text-black font-semibold border-t-2 border-black tracking-wide z-50 text-sm text-center ${
        !isOnline ? "!translate-y-0" : ""
      }`}
    >
      {!isOnline && (
        <span>Network unavailable. Cached version of app being used.</span>
      )}
    </div>
  );
}
