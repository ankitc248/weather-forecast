import { DotIcon } from "lucide-react";
export default function Loader() {
  return (
    <div className="font-medium flex text-center">
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
