import { useMode } from "../ModeProvider";
import { GlobeIcon, PresentationIcon } from "lucide-react";
export default function ModeConverter() {
  const { mode, toggleMode } = useMode();
  return (
    <div className="flex rounded-md border-2 bg-white border-black whitespace-nowrap text-black font-semibold overflow-hidden text-sm shadow-dark hover:shadow-dark-down transition-all animate__animated animate__bounceInDown w-44">
      <button
        type="button"
        className={`p-1 px-2 flex gap-1 items-center justify-center hover:bg-goodpurple focus:bg-goodpurple flex-1 border-r-2 border-black ${
          mode === "testing" ? "bg-goodpurple pointer-events-none" : ""
        }`}
        disabled={mode === "testing"}
        onClick={() => toggleMode("testing")}
      >
        <PresentationIcon size={14} strokeWidth={3} />
        Demo
      </button>
      <button
        type="button"
        className={`p-1 px-2 flex gap-1 items-center justify-center hover:bg-goodpurple focus:bg-goodpurple flex-1 border-black ${
          mode === "live" ? "bg-goodpurple pointer-events-none" : ""
        }`}
        disabled={mode === "live"}
        onClick={() => toggleMode("live")}
      >
        <GlobeIcon size={14} strokeWidth={3} />
        Live
      </button>
    </div>
  );
}
