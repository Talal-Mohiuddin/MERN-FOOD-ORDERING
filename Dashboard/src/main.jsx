import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ContextProvider } from "./context/storeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={new QueryClient()}>
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
    <ToastContainer />
  </QueryClientProvider>
);
