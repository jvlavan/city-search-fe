import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import BSForm from "./BSForm";
import BCitySearch from "./BasicSearch.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AdvanceForm from "./AdvanceForm.jsx";
import DetailedCityInfo from "./DetailedCityInfo.jsx";
const queryClient = new QueryClient();

const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/basic-home" element={<BSForm />} />
        <Route path="/advance-home" element={ <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools /><AdvanceForm /> </QueryClientProvider>} />
        <Route
          path="/basic-search"
          element={
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools />
              <BCitySearch />
            </QueryClientProvider>
          }
        />
        <Route
          path="/detailed-city-info"
          element={
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools />
              <DetailedCityInfo />
            </QueryClientProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
