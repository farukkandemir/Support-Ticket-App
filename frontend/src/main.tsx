import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider.tsx";
import TicketProvider from "./context/TicketsProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TicketProvider>
          <Toaster />
          <App />
        </TicketProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
