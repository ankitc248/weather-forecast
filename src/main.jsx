import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UnitProvider } from "./UnitProvider.jsx";
import { ModeProvider } from "./ModeProvider.jsx";
import ConnectionStatus from "./components/ConnectionStatus.jsx";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModeProvider>
      <UnitProvider>
        <ConnectionStatus />
        <App />
      </UnitProvider>
    </ModeProvider>
  </StrictMode>
);

if (import.meta.env.PROD) {
  serviceWorkerRegistration.register();
} else {
  serviceWorkerRegistration.unregister();
}
