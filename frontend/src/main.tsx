import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { TicketProvider } from "./context/TicketsProvider.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TicketProvider>
        <Toaster />
        <App />
      </TicketProvider>
    </BrowserRouter>
  </React.StrictMode>
);
