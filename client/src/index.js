import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "App";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";
import AppProviders from "providers/AppProviders";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <SoftUIControllerProvider>
      <AppProviders>
        <App />
      </AppProviders>
    </SoftUIControllerProvider>
  </HashRouter>
);
