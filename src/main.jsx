import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AccordionProvider } from "./context/AccordionContext.tsx";
import { initGA } from "./utils/analytics";
// import * as serviceWorkerRegistration from "./serviceWorkerRegistration.js";

// Initialize Google Analytics
initGA();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AccordionProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
    </AccordionProvider>
  </React.StrictMode>
);

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("./sw.js")
//       .then((registration) => {
//         console.log(
//           "Service Worker registered with scope:",
//           registration.scope
//         );
//       })
//       .catch((error) => {
//         console.log("Service Worker registration failed:", error);
//       });
//   });
// }
// serviceWorkerRegistration.register();
