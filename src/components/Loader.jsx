import { DotIcon } from "lucide-react";
export default function Loader({ className = "" }) {
  return (
    <div className={`font-medium flex text-center ${className}`}>
      <DotIcon
        className="w-4 animate-updown"
        strokeWidth={7}
        style={{ animationDelay: "-0.1s" }}
      />
      <DotIcon
        className="w-4 animate-updown"
        strokeWidth={7}
        style={{ animationDelay: "-0.2s" }}
      />
      <DotIcon
        className="w-4 animate-updown"
        strokeWidth={7}
        style={{ animationDelay: "-0.3s" }}
      />
    </div>
  );
}
