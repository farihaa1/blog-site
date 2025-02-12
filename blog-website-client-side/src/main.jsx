import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import Router from "./Router/Router";
import AuthProviders from "./Providers/AuthProvider";
import { ThemeProvider } from "./Providers/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <ThemeProvider>
        <RouterProvider router={Router}></RouterProvider>
      </ThemeProvider>
    </AuthProviders>
  </StrictMode>
);
