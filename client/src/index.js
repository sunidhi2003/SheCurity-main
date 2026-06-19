import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

import { LanguageProvider } from "./context/LanguageContext";

// Apply saved theme before render to avoid flash
const savedTheme = localStorage.getItem("shecurity-theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
