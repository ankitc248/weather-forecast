import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UnitProvider } from "./UnitProvider.jsx";
import { ModeProvider } from "./ModeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModeProvider>
      <UnitProvider>
        <App />
      </UnitProvider>
    </ModeProvider>
  </StrictMode>
);
